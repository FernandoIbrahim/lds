package com.example.SchoolManagementSystem.model.Enums;

public enum EnumAutorizacao {
    
    SECRETARIA("SECRETARIA"),
    PROFESSOR("PROFESSOR"),
    ALUNO("ALUNO");

    private final String descricao;

    EnumAutorizacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
    
