package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SchoolManagementSystem.model.Professor;

public interface ProfessorRespository extends JpaRepository<Professor, Long>{
    
}
