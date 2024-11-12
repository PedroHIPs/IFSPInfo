package com.pedrosantos.ifspinfo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.RedeSocial;

public interface RedeSocialRepository extends JpaRepository<RedeSocial, Long>{

	List<RedeSocial> findByCampusId(Long campusId);

}
