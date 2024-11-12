package com.pedrosantos.ifspinfo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pedrosantos.ifspinfo.entities.Campus;

public interface CampusRepository extends JpaRepository<Campus, Long> {

}
