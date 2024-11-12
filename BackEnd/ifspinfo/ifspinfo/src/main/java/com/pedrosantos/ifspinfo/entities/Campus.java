package com.pedrosantos.ifspinfo.entities;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


@Entity
public class Campus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;	
	private String nome;
	private String sigla;
	private String endereco;
	private String secEmail;
	private String site;
	private double nota; 
	private double latitude;
	private double longitude;
	
	
	@OneToMany(mappedBy = "campus") 
	@JsonManagedReference
    private List<Curso> cursos;
	
	public Campus() {}
	
	public Campus(String nome, String sigla, String endereco, String site, String secEmail, double nota, double latitude, double longitude) {
		super();
		this.nome = nome;
		this.sigla = sigla;
		this.endereco = endereco;
		this.site = site;
		this.secEmail = secEmail;
		this.nota = nota;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	public Campus(long id, String nome, String sigla, String endereco, String site, String secEmail, double nota, double latitude, double longitude) {
		super();
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
		this.endereco = endereco;
		this.site = site;
		this.secEmail = secEmail;
		this.nota = nota;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	
	
	public List<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(List<Curso> cursos) {
		this.cursos = cursos;
	}

	public double getNota() {
		return nota;
	}
	public void setNota(double nota) {
		this.nota = nota;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSigla() {
		return sigla;
	}
	public void setSigla(String sigla) {
		this.sigla = sigla;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	
	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getSecEmail() {
		return secEmail;
	}
	public void setSecEmail(String secEmail) {
		this.secEmail = secEmail;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Campus other = (Campus) obj;
		return Objects.equals(id, other.id);
	}
}
