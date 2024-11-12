package com.pedrosantos.ifspinfo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.Conteudo;

public interface ConteudoRepository extends JpaRepository<Conteudo, Long> {

	List<Conteudo> findByCampusId(long id);

}
