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

import com.pedrosantos.ifspinfo.entities.Conteudo;
import com.pedrosantos.ifspinfo.services.ConteudoService;

import jakarta.persistence.EntityNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/conteudo")
public class ConteudoController {

	@Autowired
	private ConteudoService conteudoService;
	
	@GetMapping
	public List<Conteudo> findAll(){
		
		return conteudoService.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Conteudo> findById(@PathVariable Long id){
		
		return conteudoService.findById(id);
	}
	
	@PostMapping
	public Conteudo save(@RequestBody Conteudo conteudo) {
		
		return conteudoService.save(conteudo);
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConteudo(@PathVariable Long id) {
        try {
            conteudoService.deleteConteudo(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // Retorna 404 caso o curso não seja encontrado
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Retorna 500 em caso de erro
        }
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<Conteudo> updateConteudo(@PathVariable Long id, @RequestBody Conteudo conteudoDetails) {
        try {
            Conteudo conteudo = conteudoService.findById(id).orElse(null);
            if (conteudo == null) {
                return ResponseEntity.notFound().build();
            }

            // Atualiza os campos do conteúdo com os dados recebidos
            conteudo.setAutor(conteudoDetails.getAutor());
            conteudo.setLink(conteudoDetails.getLink());
            conteudo.setTitulo(conteudoDetails.getTitulo());
            conteudo.setTexto(conteudoDetails.getTexto());
            conteudo.setArea(conteudoDetails.getArea());
            
            if (conteudoDetails.getCurso() != null) {
                conteudo.setCurso(conteudoDetails.getCurso()); // Atualiza o curso se houver
            }

            conteudoService.save(conteudo); // Salva o conteúdo atualizado no banco de dados

            return ResponseEntity.ok(conteudo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	@GetMapping("/campus/{campusId}/conteudos")
	public ResponseEntity<List<Conteudo>> getConteudosByCampus(@PathVariable Long campusId) {
	    List<Conteudo> conteudos = conteudoService.getConteudosByCampus(campusId);
	    return ResponseEntity.ok(conteudos);
	}
}
