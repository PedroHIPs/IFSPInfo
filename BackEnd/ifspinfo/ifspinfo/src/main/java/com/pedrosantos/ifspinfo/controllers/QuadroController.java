package com.pedrosantos.ifspinfo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pedrosantos.ifspinfo.entities.Quadro;
import com.pedrosantos.ifspinfo.services.QuadroService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/quadro")
public class QuadroController {

    @Autowired
    private QuadroService quadroService;

    @GetMapping
    public List<Quadro> findAll() {
        return quadroService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Quadro> findById(@PathVariable Long id) {
        return quadroService.findById(id);
    }

    @PostMapping
    public Quadro save(@RequestBody Quadro quadro) {
        return quadroService.save(quadro);
    }
    
    @GetMapping("/campus/{campusId}")
    public List<Quadro> getQuadroByCampus(@PathVariable Long campusId) {
        return quadroService.getQuadroByCampusId(campusId);
    }
}
