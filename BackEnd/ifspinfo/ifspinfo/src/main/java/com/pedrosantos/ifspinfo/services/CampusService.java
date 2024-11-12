package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Campus;
import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.repositories.CampusRepository;

@Service
public class CampusService {
	
	@Autowired
	private CampusRepository campusRepository;

	public List<Campus> findAll(){
		
		List<Campus> campuses = campusRepository.findAll();
	    campuses.forEach(campus -> campus.setNota(
	        campus.getCursos().stream()
	              .mapToDouble(Curso::getNotaUsuario)
	              .average()
	              .orElse(0.0)
	    ));
	    return campuses;
	}
	
	public Optional<Campus> findById(Long id){
		
		Optional<Campus> campus = campusRepository.findById(id);
	    campus.ifPresent(c -> c.setNota(
	        c.getCursos().stream()
	          .mapToDouble(Curso::getNotaUsuario)
	          .average()
	          .orElse(0.0)
	    ));
	    return campus;
	}

	@Transactional
	public Campus save(Campus campus) {
		
		return campusRepository.save(campus);
	}
}
