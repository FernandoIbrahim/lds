package com.example.SistemaAluguelCarros.models.usuarios;

public enum UserRole {
    AGENTE("AGENTE"),
    CLIENTE("CLIENTE"),
    BANCO("BANCO");

    private final String value;


    UserRole(String value) {
        this.value = value;
    }


    public String getValue(){
        return value;
    }
}
