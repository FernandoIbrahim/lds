package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.usuarios.Usuario;

import java.util.Optional;


public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica,Long>{
    Optional<PessoaJuridica> findByUsuario(Usuario usuario);    
}
