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



    public Aluno create(Long id) {
        Aluno aluno = new Aluno(id);
        return saveOrUpdateAluno(aluno);
    }

}
