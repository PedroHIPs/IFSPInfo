package com.pedrosantos.ifspinfo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long>{

    List<Curso> findByCampusId(Long campusId);

}
