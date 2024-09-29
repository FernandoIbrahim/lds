package com.example.SistemaAluguelCarros.models.PedidosAlugel.dto;
import java.time.LocalDate;


public record RequestPedidoDTO(
    float total,
    LocalDate dataInicio,
    LocalDate dataFim,
    Long matriculaAutomovel

) {
    
}
