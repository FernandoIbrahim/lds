package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.model.DisciplinaCurso;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;

import java.util.List;


public interface DisciplinaCursoRepository extends JpaRepository<DisciplinaCurso, Long> {

    List<DisciplinaCurso> findByCursoAndTipo(Curso curso, EnumDisciplina tipo);
    
}
