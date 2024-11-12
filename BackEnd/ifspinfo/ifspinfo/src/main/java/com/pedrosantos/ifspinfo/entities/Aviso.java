package com.pedrosantos.ifspinfo.entities;

import jakarta.persistence.*;

@Entity
public class Aviso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String texto;

    @ManyToOne
    @JoinColumn(name = "quadro_id")
    private Quadro quadro;

    // Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getTexto() {
        return texto;
    }
    
    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Quadro getQuadro() {
        return quadro;
    }

    public void setQuadro(Quadro quadro) {
        this.quadro = quadro;
    }
}
