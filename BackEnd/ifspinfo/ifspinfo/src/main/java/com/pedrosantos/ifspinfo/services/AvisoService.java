package com.pedrosantos.ifspinfo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pedrosantos.ifspinfo.entities.Aviso;
import com.pedrosantos.ifspinfo.repositories.AvisoRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AvisoService {

    @Autowired
    private AvisoRepository avisoRepository;

    public List<Aviso> findAll() {
        return avisoRepository.findAll();
    }

    public List<Aviso> findAllByQuadroId(Long quadroId) {
        return avisoRepository.findByQuadroId(quadroId);
    }

	public Optional<Aviso> findById(Long id) {
		return avisoRepository.findById(id);
	}

	public Aviso save(Aviso aviso) {
		return avisoRepository.save(aviso);
	}

}
