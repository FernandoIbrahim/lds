package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    
    
}
