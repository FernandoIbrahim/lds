package com.example.SchoolManagementSystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.MatriculaDisciplina;

@Service
public class RelatorioService {
    
    private MatriculaDisciplinaService matriculaDisciplinaService;

    public List<MatriculaDisciplina> getAlunosMatriculadosNoSemestre(int ano, int semestre) {

        List<MatriculaDisciplina> alunos = matriculaDisciplinaService.getMatriculadasInSemester(ano, semestre);

        if (alunos.isEmpty()) {
            throw new RuntimeException("Nao existe alunos matriculados nesse semestre");
        }

        return alunos;
    }

}
