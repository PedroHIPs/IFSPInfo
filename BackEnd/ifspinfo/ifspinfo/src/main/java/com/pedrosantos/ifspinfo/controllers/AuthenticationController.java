package com.pedrosantos.ifspinfo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedrosantos.ifspinfo.entities.Administrador;
import com.pedrosantos.ifspinfo.services.AdministradorService;

import DTO.UserAuthenticationDTO;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	 @Autowired
	 private AdministradorService administradorService;

	 @PostMapping("/login")
	 public ResponseEntity<Administrador> login(@RequestBody UserAuthenticationDTO userAutheticationdto) {
         System.out.println("Email: " + userAutheticationdto.getEmail());
	     Administrador admin = administradorService.authenticate(userAutheticationdto.getEmail(), userAutheticationdto.getSenha());
	     if (admin != null) {
	         return ResponseEntity.ok(admin);
	     } else {
	         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	     }
	 }
}
