package com.example.SistemaAluguelCarros.models.Auth.dto;

public record ResgisterPessoaFisicaRequestDTO(String email, String senha, String endereco, String nome, String rg, String cpf, String profissao, String empregadora) {
    
}
