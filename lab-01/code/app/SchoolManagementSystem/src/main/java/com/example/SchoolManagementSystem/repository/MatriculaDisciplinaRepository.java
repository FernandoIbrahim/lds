package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;
import java.util.List;


public interface MatriculaDisciplinaRepository extends JpaRepository<MatriculaDisciplina, Long>{
    List<MatriculaDisciplina> findByAluno(Aluno aluno);
}
