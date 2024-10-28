package com.example.SistemaAluguelCarros.dtos.automovel;


public record CadastrarAutomovelDTO(

    Long matricula,
    Integer ano,
    String marca,
    String modelo,
    String placa

) {}
