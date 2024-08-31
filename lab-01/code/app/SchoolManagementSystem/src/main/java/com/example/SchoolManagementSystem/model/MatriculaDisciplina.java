package com.example.SchoolManagementSystem.model;

import java.time.LocalDate;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "matricula_disciplina")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatriculaDisciplina {
    
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "id_disciplina", nullable = false)
    private Disciplina disciplina;

    @Column(name = "data_matricula", nullable = false)
    private LocalDate dataMatricula;

}
