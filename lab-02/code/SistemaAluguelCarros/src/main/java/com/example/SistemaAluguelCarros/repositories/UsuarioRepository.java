package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long>{
    Usuario findByEmail(String email);

}
