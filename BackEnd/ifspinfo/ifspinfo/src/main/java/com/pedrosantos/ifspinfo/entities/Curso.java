package com.pedrosantos.ifspinfo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Curso {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;	
	private String nome;
	private String sigla;
	private String nivel;
	private String icone;
	private int notaMec;
	private double notaUsuario;
	private double notaCorte;
	private double relacaoCanditadoVaga;
	
	@ManyToOne
	@JoinColumn(name = "campus_id")
	@JsonBackReference
	private Campus campus;

	public Curso() {}
	
	public Curso(String nome, String sigla, String nivel, String icone, int notaMec, double notaUsuario, double notaCorte,
			double relacaoCanditadoVaga, Campus campus) {
		super();
		this.nome = nome;
		this.sigla = sigla;
		this.nivel = nivel;
		this.icone = icone;
		this.notaMec = notaMec;
		this.notaUsuario = notaUsuario;
		this.notaCorte = notaCorte;
		this.relacaoCanditadoVaga = relacaoCanditadoVaga;
		this.campus = campus;
	}
	
	public Curso(long id, String nome, String sigla, String nivel, String icone, int notaMec, double notaUsuario, double notaCorte,
			double relacaoCanditadoVaga, Campus campus) {
		super();
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
		this.nivel = nivel;
		this.icone = icone;
		this.notaMec = notaMec;
		this.notaUsuario = notaUsuario;
		this.notaCorte = notaCorte;
		this.relacaoCanditadoVaga = relacaoCanditadoVaga;
		this.campus = campus;
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
	public int getNotaMec() {
		return notaMec;
	}
	public void setNotaMec(int notaMec) {
		this.notaMec = notaMec;
	}
	public double getNotaUsuario() {
		return notaUsuario;
	}
	public void setNotaUsuario(double notaUsuario) {
		this.notaUsuario = notaUsuario;
	}
	public double getNotaCorte() {
		return notaCorte;
	}
	public void setNotaCorte(double notaCorte) {
		this.notaCorte = notaCorte;
	}
	public double getRelacaoCanditadoVaga() {
		return relacaoCanditadoVaga;
	}
	public void setRelacaoCanditadoVaga(double relacaoCanditadoVaga) {
		this.relacaoCanditadoVaga = relacaoCanditadoVaga;
	}
	public Campus getCampus() {
		return campus;
	}
	public void setCampus(Campus campus) {
		this.campus = campus;
	}
	public String getNivel() {
		return nivel;
	}
	public void setNivel(String nivel) {
		this.nivel = nivel;
	}

	public String getIcone() {
		return icone;
	}
	public void setIcone(String icone) {
		this.icone = icone;
	}
}
