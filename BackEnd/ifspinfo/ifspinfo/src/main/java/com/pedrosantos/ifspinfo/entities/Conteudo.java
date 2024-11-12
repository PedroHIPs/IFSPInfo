package com.pedrosantos.ifspinfo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Conteudo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String autor;
	private String link;
	
    @Column(columnDefinition = "LONGTEXT")
	private String texto;
    
	private String area;
	private String titulo;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campus_id")
    private Campus campus; 
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_id")
    private Curso curso; // Relacionamento com Curso (opcional)
	
	@ManyToOne
	@JoinColumn(name = "administrador_id")
	private Administrador administrador;
	
	public Conteudo() {}

	public Conteudo(String autor, String link, String texto, String area, Curso curso, Campus campus, String titulo,
			Administrador administrador) {
		super();
		this.autor = autor;
		this.link = link;
		this.texto = texto;
		this.area = area;
		this.curso = curso;
		this.campus = campus;
		this.titulo = titulo;
		this.administrador = administrador;
	}

	public Conteudo(long id, String autor, String link, String texto, String area, Curso curso, Campus campus, String titulo,
			Administrador administrador) {
		super();
		this.id = id;
		this.autor = autor;
		this.link = link;
		this.texto = texto;
		this.area = area;
		this.curso = curso;
		this.campus = campus;
		this.titulo = titulo;
		this.administrador = administrador;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public Administrador getAdministrador() {
		return administrador;
	}

	public void setAdministrador(Administrador administrador) {
		this.administrador = administrador;
	}

	public Campus getCampus() {
		return campus;
	}

	public void setCampus(Campus campus) {
		this.campus = campus;
	}
	
	
}
