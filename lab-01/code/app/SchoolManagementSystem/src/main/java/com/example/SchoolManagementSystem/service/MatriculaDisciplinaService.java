package com.example.SchoolManagementSystem.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;
import com.example.SchoolManagementSystem.repository.MatriculaDisciplinaRepository;

@Service
public class MatriculaDisciplinaService {

    @Autowired
    public MatriculaDisciplinaRepository matriculaDisciplinaRepository;


    public MatriculaDisciplina saveOrUpdateMatriculaDisciplina(MatriculaDisciplina matriculaDisciplina){
        return matriculaDisciplinaRepository.save(matriculaDisciplina);
    }


    public MatriculaDisciplina create(Aluno aluno, Disciplina disciplina){
        
        MatriculaDisciplina matriculaDisciplina = MatriculaDisciplina.builder()
            .aluno(aluno)
            .disciplina(disciplina)
            .dataMatricula(LocalDate.now())
            .build();
        return saveOrUpdateMatriculaDisciplina(matriculaDisciplina);
    }


}
