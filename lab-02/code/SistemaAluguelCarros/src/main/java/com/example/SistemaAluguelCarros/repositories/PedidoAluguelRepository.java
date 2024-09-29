package com.example.SistemaAluguelCarros.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.SistemaAluguelCarros.models.PedidosAlugel.PedidoAluguel;

import java.time.LocalDate;
import java.util.List;


public interface PedidoAluguelRepository extends JpaRepository<PedidoAluguel,Long>{
    List<PedidoAluguel> findByIdCliente(Long idCliente); //pessoafisica
    List<PedidoAluguel> findByIdProprietario(Long idProprietario); //proprietario

    @Query("SELECT COUNT(p) = 0 FROM PedidoAluguel p WHERE p.matriculaAutomovel = :matriculaAutomovel " +
        "AND ((p.dataInicio <= :dataFim AND p.dataFim >= :dataInicio))")
    boolean isAutomovelDisponivel(@Param("matriculaAutomovel") long matriculaAutomovel,
                            @Param("dataInicio") LocalDate dataInicio,
                            @Param("dataFim") LocalDate dataFim);

} 


