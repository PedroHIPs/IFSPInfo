package com.pedrosantos.ifspinfo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Conteudo;
import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.repositories.ConteudoRepository;
import com.pedrosantos.ifspinfo.repositories.CursoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ConteudoService {
	
	@Autowired
	private ConteudoRepository conteudoRepository;
	
	@Autowired
	private CursoRepository cursoRepository;
	
	public List<Conteudo> findAll(){
		
		return conteudoRepository.findAll();
	}
	
	public Optional<Conteudo> findById(Long id){
		
		return conteudoRepository.findById(id);
	}

	@Transactional
	public Conteudo save(Conteudo conteudo) {
		
		return conteudoRepository.save(conteudo);
	}

	public void deleteConteudo(Long id) {
		// TODO Auto-generated method stub
        if (!conteudoRepository.existsById(id)) {
            throw new EntityNotFoundException("Conteudo não encontrado com ID: " + id);
        }
        conteudoRepository.deleteById(id);
	}

	public List<Conteudo> getConteudosByCampus(Long campusId) {
        
		return conteudoRepository.findByCampusId(campusId);
    }
}
