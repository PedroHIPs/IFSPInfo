package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.entities.RedeSocial;
import com.pedrosantos.ifspinfo.repositories.RedeSocialRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RedeSocialService {
	@Autowired
	private RedeSocialRepository redeSocialRepository;

	public List<RedeSocial> findAll(){
		
		return redeSocialRepository.findAll();
	}
	
	public Optional<RedeSocial> findById(Long id){
		
		return redeSocialRepository.findById(id);
	}

	@Transactional
	public RedeSocial save(RedeSocial redeSocial) {
		
		return redeSocialRepository.save(redeSocial);
	}

	public List<RedeSocial> getRedesByCampusId(Long campusId) {
		return redeSocialRepository.findByCampusId(campusId);
	}
	
	public void deleteRedeSocial(Long id) {
        if (!redeSocialRepository.existsById(id)) {
            throw new EntityNotFoundException("Rede Social não encontrada com ID: " + id);
        }
        redeSocialRepository.deleteById(id);
    }

	public RedeSocial updateRede(Long id, RedeSocial redeDetails) {
		RedeSocial rede = redeSocialRepository.findById(id)
	    .orElseThrow();

	    // Atualiza os campos com os dados recebidos
		rede.setNome(redeDetails.getNome());
		rede.setUrl(redeDetails.getUrl());
		rede.setIcone(redeDetails.getIcone());
		rede.setCorBG(redeDetails.getCorBG());

	    // Atualiza o campus se necessário
	    if (redeDetails.getCampus() != null) {
	    	rede.setCampus(redeDetails.getCampus());
	    }
	    
	    // Salva e retorna o curso atualizado
	    return redeSocialRepository.save(rede);
	}
}
