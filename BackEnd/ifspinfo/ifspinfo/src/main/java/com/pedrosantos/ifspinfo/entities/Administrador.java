package com.pedrosantos.ifspinfo.entities;

import java.util.Date;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Administrador {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;	
	private String nome;
	private String matricula;
	private int cpf;
	private Date dataNasc;
	private String email;
	private String senha;
	private String cargo;
	private Boolean aprovado;
	
	@ManyToOne
	@JoinColumn(name = "campus_id")
	private Campus campus;
	
	public Administrador() {}

	public Administrador(String nome, String matricula, int cPF, Date dataNasc, String email, String senha,
			String cargo, Boolean aprovado, Campus campus) {
		super();
		this.nome = nome;
		this.matricula = matricula;
		this.cpf = cPF;
		this.dataNasc = dataNasc;
		this.email = email;
		this.senha = senha;
		this.cargo = cargo;
		this.aprovado = aprovado;
		this.campus = campus;
	}
	
	public Administrador(long id, String nome, String matricula, int cPF, Date dataNasc, String email, String senha,
			String cargo, Boolean aprovado, Campus campus) {
		super();
		this.id = id;
		this.nome = nome;
		this.matricula = matricula;
		this.cpf = cPF;
		this.dataNasc = dataNasc;
		this.email = email;
		this.senha = senha;
		this.cargo = cargo;
		this.aprovado = aprovado;
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
	public String getMatricula() {
		return matricula;
	}
	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}
	public int getcpf() {
		return cpf;
	}
	public void setcpf(int Cpf) {
		cpf = Cpf;
	}
	public Date getDataNasc() {
		return dataNasc;
	}
	public void setDataNasc(Date dataNasc) {
		this.dataNasc = dataNasc;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getCargo() {
		return cargo;
	}
	public void setCargo(String cargo) {
		this.cargo = cargo;
	}
	public Boolean getAprovado() {
		return aprovado;
	}
	public void setAprovado(Boolean aprovado) {
		this.aprovado = aprovado;
	}
	public Campus getCampus() {
		return campus;
	}
	public void setCampus(Campus campus) {
		this.campus = campus;
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
		Administrador other = (Administrador) obj;
		return Objects.equals(id, other.id);
	}
}
