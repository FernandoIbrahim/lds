package com.example.SistemaAluguelCarros.dtos.auth;

public record RegistrarPessoaJuridicaRequestDTO(String email, String senha, String endereco, String nomeFantasia, String cnpj) {
    
}
