package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.repository.AlunoRepository;

public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno saveOrUpdateUsuario(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

}
