package com.example.SchoolManagementSystem.model;

import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "disciplina_curso")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisciplinaCurso {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_disciplina", nullable = false)
    private Disciplina disciplina;

    @ManyToOne
    @JoinColumn(name = "id_curso", nullable = false)
    private Curso curso;

    @Column(name = "periodo", nullable = false)
    private int periodo;

    @Column(name = "tipo", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnumDisciplina tipo;
    
}
