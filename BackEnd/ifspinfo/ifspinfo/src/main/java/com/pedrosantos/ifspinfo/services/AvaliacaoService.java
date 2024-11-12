package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Avaliacao;
import com.pedrosantos.ifspinfo.repositories.AvaliacaoRepository;

@Service
public class AvaliacaoService {
	
	@Autowired
	private AvaliacaoRepository avaliacaoRepository;

	public List<Avaliacao> findAll(){
	
		return avaliacaoRepository.findAll();
	}
	
	public Optional<Avaliacao> findById(Long id){
		
		return avaliacaoRepository.findById(id);
	}
	
	@Transactional
	public Avaliacao save(Avaliacao avaliacao) {
		
		return avaliacaoRepository.save(avaliacao);
	}
	
	public List<Avaliacao> getAvaliacoesByCursoId(int cursoId) {
	    // Implementação para buscar avaliações do curso
	    return avaliacaoRepository.findByCursoId(cursoId);
	}
}
