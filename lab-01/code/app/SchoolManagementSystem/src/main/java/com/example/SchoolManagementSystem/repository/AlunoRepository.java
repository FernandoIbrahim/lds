package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long>{
    
    
}
