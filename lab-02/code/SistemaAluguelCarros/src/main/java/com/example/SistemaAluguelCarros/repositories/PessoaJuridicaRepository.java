package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;

import java.util.Optional;


public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica,Long>{
    Optional<PessoaJuridica> findByUsuario(Usuario usuario);    
}
