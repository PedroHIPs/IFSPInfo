package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.entities.Quadro;
import com.pedrosantos.ifspinfo.repositories.QuadroRepository;

@Service
public class QuadroService {
	
	@Autowired
	private QuadroRepository quadroRepository;

	public List<Quadro> findAll(){
		
		return quadroRepository.findAll();
	}
	
	public Optional<Quadro> findById(Long id){
		
		return quadroRepository.findById(id);
	}

	@Transactional
	public Quadro save(Quadro quadro) {
		
		return quadroRepository.save(quadro);
	}
	
	public List<Quadro> getQuadroByCampusId(Long campusId) {
        return quadroRepository.findByCampusId(campusId);
    }
}
