package com.example.SistemaAluguelCarros.repositories;
import com.example.SistemaAluguelCarros.models.Contratos.Contrato;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratoRepository extends JpaRepository<Contrato,Long>{
    
} 