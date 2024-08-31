package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.repository.ProfessorRespository;
import com.example.SchoolManagementSystem.model.Professor;

@Service
public class ProfessorService {

    @Autowired
    ProfessorRespository professorRespository;

    public Professor saveOrUpdateProfessor(Professor professor){
        return professorRespository.save(professor);
    }
    
    public Professor create(Long id){
        Professor professor = Professor.builder()
            .id(id)
            .build();
        return saveOrUpdateProfessor(professor);
    }
    
}
