package com.example.SistemaAluguelCarros.models.PedidosAlugel.dto;

import java.time.LocalDate;

public record AtualizarPedidoClienteDTO(
    LocalDate dataInicio,
    LocalDate dataFim,
    Float totalPedido
) {}
