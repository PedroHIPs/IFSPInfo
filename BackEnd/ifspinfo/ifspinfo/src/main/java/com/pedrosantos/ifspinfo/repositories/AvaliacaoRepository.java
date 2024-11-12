package com.pedrosantos.ifspinfo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.Avaliacao;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long>{
    List<Avaliacao> findByCursoId(int cursoId);
}
