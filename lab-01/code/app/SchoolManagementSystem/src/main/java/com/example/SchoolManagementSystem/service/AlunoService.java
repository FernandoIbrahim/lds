package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno saveOrUpdateAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    // Create - Create a new Aluno
    public Aluno create(Long id) {
        Aluno aluno = Aluno.builder()
            .id(id)
            .build();
        return saveOrUpdateAluno(aluno);
    }

}
