package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

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

    public List<Curso> findAllCurso() {
        List<Curso> cursos = cursoRepository.findAll();
        if (cursos.isEmpty()) {
            throw new RuntimeException("Cursos não encontrado");
        }
        return cursos;
    }

    public Curso findById(Long id) {
        Optional<Curso> curso = cursoRepository.findById(id);
        return curso.orElseThrow(() -> new RuntimeException("Curso nao encontrado"));
    }

    public Curso createCurso(String nome) {
        Curso newCurso = Curso.builder()
        .nome(nome)
        .build();
                
        return saveOrUpdateCurso(newCurso);
    }
    
}
