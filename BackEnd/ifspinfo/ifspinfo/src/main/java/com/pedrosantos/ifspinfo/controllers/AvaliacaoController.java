package com.pedrosantos.ifspinfo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedrosantos.ifspinfo.entities.Avaliacao;
import com.pedrosantos.ifspinfo.services.AvaliacaoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

	@Autowired
	private AvaliacaoService avaliacaoService;
	
	@GetMapping
	public List<Avaliacao> findAll(){
		
		return avaliacaoService.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Avaliacao> findById(@PathVariable Long id){
		
		return avaliacaoService.findById(id);
	}
	
	@PostMapping
	public Avaliacao save(@RequestBody Avaliacao avaliacao) {
		
		return avaliacaoService.save(avaliacao);
	}
	
	@GetMapping("/curso/{cursoId}")
	public ResponseEntity<List<Avaliacao>> getAvaliacoesByCursoId(@PathVariable int cursoId) {
	    List<Avaliacao> avaliacoes = avaliacaoService.getAvaliacoesByCursoId(cursoId);
	    return ResponseEntity.ok(avaliacoes);
	}
}
