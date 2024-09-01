package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

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

    public List<Disciplina> findAllDiscplina() {
        List<Disciplina> disciplinas = disciplinaRepository.findAll();
        if (disciplinas.isEmpty()) {
            throw new RuntimeException("Displinas não encontradas");
        }
        return disciplinas;
    }

    public Disciplina findByIdDisciplina(Long id) {
        Optional<Disciplina> disciplina = disciplinaRepository.findById(id);
        return disciplina.orElseThrow( () -> new RuntimeException("Disciplina não encontrada"));
    }

    public Disciplina createDisciplina(String nome, int cargaHoraria, int maximoAlunos) {
        Disciplina newDisciplina = Disciplina.builder()
		.nome(nome)
		.cargaHoraria(cargaHoraria)
		.maximoAlunos(maximoAlunos)
		.build();

        return saveOrUpdateDisciplina(newDisciplina);
    }

}
