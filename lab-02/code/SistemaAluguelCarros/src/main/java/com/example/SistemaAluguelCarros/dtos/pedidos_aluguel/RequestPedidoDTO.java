package com.example.SistemaAluguelCarros.dtos.pedidos_aluguel;
import java.time.LocalDate;


public record RequestPedidoDTO(
    float total,
    LocalDate dataInicio,
    LocalDate dataFim,
    Long matriculaAutomovel

) {
    
}
