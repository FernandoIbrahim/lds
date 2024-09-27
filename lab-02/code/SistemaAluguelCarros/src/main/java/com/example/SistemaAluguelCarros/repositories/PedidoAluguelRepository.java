package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SistemaAluguelCarros.models.PedidosAlugel.PedidoAluguel;
import java.util.List;


public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel,Long>{
    List<PedidoAluguel> findByIdCliente(Long idCliente); //pessoafisica
    List<PedidoAluguel> findByIdProprietario(Long idProprietario); //proprietario
} 