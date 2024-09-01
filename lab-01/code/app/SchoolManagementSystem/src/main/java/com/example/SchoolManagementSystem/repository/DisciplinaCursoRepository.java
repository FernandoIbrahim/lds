package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.DisciplinaCurso;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;

import java.util.List;
import java.util.Optional;


public interface DisciplinaCursoRepository extends JpaRepository<DisciplinaCurso, Long> {

    List<DisciplinaCurso> findByCursoAndTipo(Curso curso, EnumDisciplina tipo);
    Optional<DisciplinaCurso> findByCursoAndDisciplina(Curso curso, Disciplina disciplina);
    
}
