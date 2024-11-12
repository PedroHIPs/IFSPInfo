package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Curso;
import com.pedrosantos.ifspinfo.repositories.CursoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CursoService {
	
	@Autowired
	private CursoRepository cursoRepository;

	public List<Curso> findAll(){
	
		return cursoRepository.findAll();
	}
	
	public Optional<Curso> findById(Long id){
		
		return cursoRepository.findById(id);
	}
	
	@Transactional
	public Curso save(Curso curso) {
		
		return cursoRepository.save(curso);
	}
	
	public List<Curso> getCursosByCampusId(Long campusId) {
        return cursoRepository.findByCampusId(campusId);
    }
	
	public void deleteCurso(Long id) {
        if (!cursoRepository.existsById(id)) {
            throw new EntityNotFoundException("Curso não encontrado com ID: " + id);
        }
        cursoRepository.deleteById(id);
    }
	
	public Curso updateCurso(Long id, Curso cursoDetails) {
        Curso curso = cursoRepository.findById(id)
            .orElseThrow();

        // Atualiza os campos com os dados recebidos
        curso.setNome(cursoDetails.getNome());
        curso.setNivel(cursoDetails.getNivel());
        curso.setSigla(cursoDetails.getSigla());
        curso.setNotaCorte(cursoDetails.getNotaCorte());
        curso.setNotaMec(cursoDetails.getNotaMec());
        curso.setRelacaoCanditadoVaga(cursoDetails.getRelacaoCanditadoVaga());

        // Atualiza o campus se necessário
        if (cursoDetails.getCampus() != null) {
            curso.setCampus(cursoDetails.getCampus());
        }

        // Salva e retorna o curso atualizado
        return cursoRepository.save(curso);
    }
}
