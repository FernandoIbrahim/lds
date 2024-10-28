package com.example.SistemaAluguelCarros.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.Contrato;

public interface ContratoRepository extends JpaRepository<Contrato,Long>{
    
} 