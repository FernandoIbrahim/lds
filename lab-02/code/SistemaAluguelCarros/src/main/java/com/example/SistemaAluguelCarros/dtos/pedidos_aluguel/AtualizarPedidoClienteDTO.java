package com.example.SistemaAluguelCarros.dtos.pedidos_aluguel;

import java.time.LocalDate;

public record AtualizarPedidoClienteDTO(
    LocalDate dataInicio,
    LocalDate dataFim,
    Float totalPedido
) {}
