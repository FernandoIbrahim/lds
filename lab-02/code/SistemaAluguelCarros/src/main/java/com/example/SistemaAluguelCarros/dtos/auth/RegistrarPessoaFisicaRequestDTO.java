package com.example.SistemaAluguelCarros.dtos.auth;

public record RegistrarPessoaFisicaRequestDTO(String email, String senha, String endereco, String nome, String rg, String cpf, String profissao, String empregadora) {
    
}
