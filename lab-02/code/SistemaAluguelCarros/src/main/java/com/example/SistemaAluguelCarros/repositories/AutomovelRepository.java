package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Automovel.Automovel;

public interface AutomovelRepository extends JpaRepository<Automovel, Long>{
} 