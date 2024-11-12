package com.pedrosantos.ifspinfo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RedeSocial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String nome;
	private String url;
	private String icone;
	private String corBG;
	
	@ManyToOne
	@JoinColumn(name = "campus_id")
	private Campus campus;
	
	public RedeSocial() {
		super();
	}

	public RedeSocial(String nome, String url, String icone, String corBG, Campus campus) {
		super();
		this.nome = nome;
		this.url = url;
		this.icone = icone;
		this.campus = campus;
		this.corBG = corBG;
	}

	public RedeSocial(int id, String nome, String url, String icone, String corBG, Campus campus) {
		super();
		this.id = id;
		this.nome = nome;
		this.url = url;
		this.icone = icone;
		this.corBG = corBG;
		this.campus = campus;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIcone() {
		return icone;
	}

	public void setIcone(String icone) {
		this.icone = icone;
	}

	public Campus getCampus() {
		return campus;
	}

	public void setCampus(Campus campus) {
		this.campus = campus;
	}

	public String getCorBG() {
		return corBG;
	}

	public void setCorBG(String corBG) {
		this.corBG = corBG;
	}
	
}
