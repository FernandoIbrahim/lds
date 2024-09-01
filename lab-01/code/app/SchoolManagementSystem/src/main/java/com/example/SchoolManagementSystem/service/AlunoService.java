package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno saveOrUpdateAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    // Create - Create a new Aluno
    public Aluno create(Long id, Curso curso) {
        Aluno aluno = Aluno.builder()
            .id(id)
            .curso(curso)
            .build();
        return saveOrUpdateAluno(aluno);
    }

    public Aluno findById(Long id){
        Optional<Aluno> aluno = alunoRepository.findById(id);
        return aluno.orElseThrow( () -> new RuntimeException("Aluno não encontrada") );
    }

    public List<Aluno> findAll(){
        List<Aluno> alunos = alunoRepository.findAll();
        if (alunos.isEmpty()) {
            throw new RuntimeException("Cursos não encontrado");
        }
        return alunos;
    }

}
