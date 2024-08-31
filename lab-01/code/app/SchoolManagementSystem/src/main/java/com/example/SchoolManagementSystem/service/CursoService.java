package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.repository.CursoRepository;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;
    
    public Curso saveOrUpdateCurso(Curso curso) {
        return cursoRepository.save(curso);
    }

    public Curso createCurso(String nome) {
        Curso newCurso = Curso.builder()
        .nome(nome)
        .build();
                
        return saveOrUpdateCurso(newCurso);
    }
    
}
