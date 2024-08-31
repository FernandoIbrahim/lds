package com.example.SchoolManagementSystem.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "disciplina")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Disciplina {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "carga_horaria", nullable = false)
    private int cargaHoraria;
    
    @Column(name = "maximo_alunos", nullable = false)
    private int maximoAlunos;
    
}
