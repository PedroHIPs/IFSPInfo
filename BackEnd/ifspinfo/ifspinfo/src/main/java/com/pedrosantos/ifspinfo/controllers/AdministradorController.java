package com.pedrosantos.ifspinfo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedrosantos.ifspinfo.entities.Administrador;
import com.pedrosantos.ifspinfo.services.AdministradorService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/administrador")
public class AdministradorController {

	@Autowired
	private AdministradorService administradorService;
	
	@GetMapping
	public List<Administrador> findAll(){
		
		return administradorService.findAll();
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> save(@RequestBody Administrador administrador) {
		
		Administrador newAdministrador =  administradorService.save(administrador);
		
		return(newAdministrador != null ? ResponseEntity.ok().body("Cadastrado com Sucesso!") 
				: ResponseEntity.badRequest().body("Erro ao Cadastrar!"));
	}
	
}
