package com.pedrosantos.ifspinfo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pedrosantos.ifspinfo.entities.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Long>{
	
	Administrador findByEmail(String email);
	
	@Query("SELECT a FROM Administrador a WHERE a.email = :email AND a.senha = :senha")
	Administrador authenticate(String email, String senha);
}
