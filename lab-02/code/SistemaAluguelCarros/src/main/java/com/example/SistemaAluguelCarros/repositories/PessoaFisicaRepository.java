package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;

import java.util.Optional;

public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica,Long>{
    Optional<PessoaFisica> findByUsuario(Usuario usuario);
}
