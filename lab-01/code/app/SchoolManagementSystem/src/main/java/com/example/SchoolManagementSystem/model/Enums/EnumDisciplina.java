package com.example.SchoolManagementSystem.model.Enums;

public enum EnumDisciplina {
    
    OPTATIVA("OPTATIVA"),
    OBRIGATORIA("OBRIGATORIA");

    private final String descricao;

    EnumDisciplina(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
