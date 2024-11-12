package com.pedrosantos.ifspinfo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.Quadro;

public interface QuadroRepository extends JpaRepository<Quadro, Long>{
   
	List<Quadro> findByCampusId(Long campusId);

}
