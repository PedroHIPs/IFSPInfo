package com.pedrosantos.ifspinfo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.entities.RedeSocial;
import com.pedrosantos.ifspinfo.services.RedeSocialService;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/redesocial")
public class RedeSocialController {

	@Autowired
	private RedeSocialService redeSocialService;
	
	@GetMapping
	public List<RedeSocial> findAll(){
		
		return redeSocialService.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<RedeSocial> findById(@PathVariable Long id){
		
		return redeSocialService.findById(id);
	}
	
	@PostMapping
	public RedeSocial save(@RequestBody RedeSocial redeSocial) {
		
		return redeSocialService.save(redeSocial);
	}
	
	@GetMapping("/campus/{campusId}")
    public List<RedeSocial> getRedesByCampus(@PathVariable Long campusId) {
        return redeSocialService.getRedesByCampusId(campusId);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        try {
        	redeSocialService.deleteRedeSocial(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 caso o curso não seja encontrado
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 em caso de erro
        }
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<RedeSocial> updateRede(@PathVariable Long id, @RequestBody RedeSocial redeDetails) {
        RedeSocial updatedRede = redeSocialService.updateRede(id, redeDetails);
        return ResponseEntity.ok(updatedRede);
    }
}
