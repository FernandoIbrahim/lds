package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.repository.DisciplinaRepository;

@Service
public class DisciplinaService {
    
    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Disciplina saveOrUpdateDisciplina(Disciplina disciplina) {
        return disciplinaRepository.save(disciplina);
    }

    public Disciplina createDisciplina(String nome, int cargaHoraria, int maximoAlunos) {
        Disciplina newDisciplina = Disciplina.builder()
		.nome(nome)
		.cargaHoraria(cargaHoraria)
		.maximoAlunos(maximoAlunos)
		.build();

        return newDisciplina;
    }

}
