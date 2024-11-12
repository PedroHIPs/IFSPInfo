package com.pedrosantos.ifspinfo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.entities.Administrador;
import com.pedrosantos.ifspinfo.entities.Campus;
import com.pedrosantos.ifspinfo.repositories.AdministradorRepository;
import com.pedrosantos.ifspinfo.repositories.CampusRepository;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private EmailService emailService;

    public List<Administrador> findAll() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> findById(Long id) {
        return administradorRepository.findById(id);
    }

    @Transactional
    public Administrador save(Administrador administrador) {
        if (this.administradorRepository.findByEmail(administrador.getEmail()) != null)
            return null;

        // Recupera o campus pelo ID
        Long campusId = administrador.getCampus().getId();
        Campus campus = campusRepository.findById(campusId)
                .orElseThrow(() -> new IllegalArgumentException("Campus não encontrado com ID: " + campusId));

        // Associa o campus ao administrador
        administrador.setCampus(campus);

        // Encriptografando senha
        String encryptedPassword = new BCryptPasswordEncoder().encode(administrador.getSenha());
        administrador.setSenha(encryptedPassword);

        Administrador savedAdmin = administradorRepository.save(administrador);

        // Enviar email de aprovação
        if (savedAdmin != null) {
            String campusEmail = savedAdmin.getCampus().getSecEmail();
            String subject = "Solicitação de Inclusão de Administrador";
            String text = "Um novo administrador foi cadastrado e está aguardando aprovação."
            		+ "\n Nome: " + administrador.getNome()
            		+ "\n Cargo: " + administrador.getCargo()
            		+ "\n Matricula" + administrador.getMatricula()
            		+ "\n Caso aprove e reconheça esse administrador, responda esse email.";
            emailService.sendSimpleMessage(campusEmail, subject, text);
        }

        return savedAdmin;
    }

    public Administrador authenticate(String email, String senha) {
    	Administrador administrador = administradorRepository.findByEmail(email);

        if (administrador == null) {
            System.out.println("Administrador com email " + email + " não encontrado.");
            return null; // Administrador não encontrado
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        boolean match = passwordEncoder.matches(senha, administrador.getSenha());

        if (!match) {
            System.out.println("Senha incorreta para o email " + email);
        }

        return (match ? administrador : null);
    }
}
