package com.pedrosantos.ifspinfo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pedrosantos.ifspinfo.entities.Aviso;

import java.util.List;

@Repository
public interface AvisoRepository extends JpaRepository<Aviso, Long> {
    List<Aviso> findByQuadroId(Long quadroId);
}
