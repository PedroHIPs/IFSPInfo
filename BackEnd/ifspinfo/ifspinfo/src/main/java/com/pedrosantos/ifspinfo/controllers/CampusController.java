package com.pedrosantos.ifspinfo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedrosantos.ifspinfo.entities.Campus;
import com.pedrosantos.ifspinfo.services.CampusService;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/campus")
public class CampusController {

	@Autowired
	private CampusService campusService;
	
	@GetMapping
	public List<Campus> findAll(){
		
		return campusService.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Campus> findById(@PathVariable Long id){
		
		return campusService.findById(id);
	}
	
	@PostMapping
	public Campus save(@RequestBody Campus campus) {
		
		return campusService.save(campus);
	}
	
}

