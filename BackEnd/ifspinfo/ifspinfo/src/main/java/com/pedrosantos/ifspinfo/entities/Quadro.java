package com.pedrosantos.ifspinfo.entities;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Quadro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "campus_id")
    private Campus campus;

    @OneToMany(mappedBy = "quadro", cascade = CascadeType.ALL)
    private Set<Aviso> avisos;
    
    public Quadro() {

	}

    public Quadro(Campus campus, Set<Aviso> avisos) {
		super();
		this.campus = campus;
		this.avisos = avisos;
	}

	public Quadro(Long id, Campus campus, Set<Aviso> avisos) {
		super();
		this.id = id;
		this.campus = campus;
		this.avisos = avisos;
	}

	public Quadro(Long quadroId) {
		// TODO Auto-generated constructor stub
	}

	// Getters e Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Campus getCampus() {
        return campus;
    }
    
    public void setCampus(Campus campus) {
        this.campus = campus;
    }
    
    public Set<Aviso> getAvisos() {
        return avisos;
    }
    
    public void setAvisos(Set<Aviso> avisos) {
        this.avisos = avisos;
    }
}
