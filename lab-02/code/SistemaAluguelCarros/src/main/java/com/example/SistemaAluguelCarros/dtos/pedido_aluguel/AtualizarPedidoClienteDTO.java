package com.example.SistemaAluguelCarros.dtos.pedido_aluguel;

import java.time.LocalDate;

public record AtualizarPedidoClienteDTO(
    LocalDate dataInicio,
    LocalDate dataFim,
    Float totalPedido
) {}
