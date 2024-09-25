package com.example.SistemaAluguelCarros.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long>{
    Optional<Usuario> findByEmail(String email);

}
