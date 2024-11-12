package com.pedrosantos.ifspinfo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.pedrosantos.ifspinfo.entities.Aviso;
import com.pedrosantos.ifspinfo.entities.Quadro;
import com.pedrosantos.ifspinfo.services.AvisoService;
import com.pedrosantos.ifspinfo.services.QuadroService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/quadro/{quadroId}/aviso")
public class AvisoController {

    @Autowired
    private AvisoService avisoService;
    
    @Autowired
    private QuadroService quadroService;
    
    /*@GetMapping
    public List<Aviso> findAll(@PathVariable Long quadroId) {
        return avisoService.findAllByQuadroId(quadroId);
    }*/

    @GetMapping
    public List<Aviso> findAll() {
    	return avisoService.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Aviso> findById(@PathVariable Long id) {
        return avisoService.findById(id);
    }

    @PostMapping
    public Aviso save(@PathVariable Long quadroId, @RequestBody Aviso aviso) {
    	Optional<Quadro> quadro;
		try {
			quadro = quadroService.findById(quadroId);
	        if (!quadro.isPresent()) {
	            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Quadro não encontrado");
	        }
	        aviso.setQuadro(quadro.get()); // Associa o quadro ao aviso
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return avisoService.save(aviso);
    }
}
