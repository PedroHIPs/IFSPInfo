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
import com.pedrosantos.ifspinfo.services.CursoService;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/curso")
public class CursoController {

	@Autowired
	private CursoService cursoService;
	
	@GetMapping
	public List<Curso> findAll(){
		
		return cursoService.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Curso> findById(@PathVariable Long id){
		
		return cursoService.findById(id);
	}
	
	@PostMapping
	public Curso save(@RequestBody Curso curso) {
		
		return cursoService.save(curso);
	}
	
	@GetMapping("/campus/{campusId}")
    public List<Curso> getCursosByCampus(@PathVariable Long campusId) {
        return cursoService.getCursosByCampusId(campusId);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        try {
            cursoService.deleteCurso(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 caso o curso não seja encontrado
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 em caso de erro
        }
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
        Curso updatedCurso = cursoService.updateCurso(id, cursoDetails);
        return ResponseEntity.ok(updatedCurso);
    }
}
