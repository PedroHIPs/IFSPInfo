package com.pedrosantos.ifspinfo.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;
    private int nota;
    private String texto;
    private Date dataPost;
    
    @ManyToOne
    @JoinColumn(name = "curso_id")
    private Curso curso;
    
    public Avaliacao() {}

    public Avaliacao(String nome, int nota, String texto, Curso curso) {
        this.nome = nome;
        this.nota = nota;
        this.texto = texto;
        this.curso = curso;
    }

    @PrePersist
    protected void onCreate() {
        this.dataPost = new Date(); // Define a data atual antes de persistir no banco
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
    public int getNota() {
        return nota;
    }
    public void setNota(int nota) {
        this.nota = nota;
    }
    public String getTexto() {
        return texto;
    }
    public void setTexto(String texto) {
        this.texto = texto;
    }
    public Date getDataPost() {
        return dataPost;
    }
    public void setDataPost(Date dataPost) {
        this.dataPost = dataPost;
    }
    public Curso getCurso() {
        return curso;
    }
    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}
