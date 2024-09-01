package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.DisciplinaCurso;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;
import com.example.SchoolManagementSystem.repository.DisciplinaCursoRepository;

@Service
public class DisciplinaCursoService {
    
    @Autowired
    private DisciplinaCursoRepository disciplinaCursoRepository;

    public DisciplinaCurso saveOrUpdateDisciplinaCurso(DisciplinaCurso disciplinaCurso) {
        return disciplinaCursoRepository.save(disciplinaCurso);
    }

    public DisciplinaCurso createDisciplinaCurso(Disciplina disciplina, Curso curso, int periodo, EnumDisciplina enumDisciplina) {
        DisciplinaCurso disciplinaCurso = DisciplinaCurso.builder()
        .disciplina(disciplina)
        .curso(curso)
        .periodo(periodo)
        .tipo(enumDisciplina)
        .build();

        return saveOrUpdateDisciplinaCurso(disciplinaCurso);
    }

    public List<DisciplinaCurso> findByCursoAndTipo(Curso curso, EnumDisciplina tipo) {
        
        List<DisciplinaCurso> disciplinaCursos =  disciplinaCursoRepository.findByCursoAndTipo(curso, tipo);
        if(disciplinaCursos.isEmpty()){
            throw new RuntimeException("Erro: nenhuma disciplina encontrada neste curso");    
        }
        return disciplinaCursos;
    }


    public boolean cursoContainsDiciplina(Curso curso, Disciplina disciplina, EnumDisciplina enumDisciplina){

        if(enumDisciplina == getTipo(curso, disciplina) ){
            return true;
        }
        return false;

    }


    //retorna se uma disciplina é optativa ou obrigatória
    public EnumDisciplina getTipo(Curso curso, Disciplina disciplina){

         Optional<DisciplinaCurso> disciplinaCurso = disciplinaCursoRepository.findByCursoAndDisciplina(curso, disciplina);
         
         DisciplinaCurso foundDisciplinaCurso = disciplinaCurso.orElseThrow(() -> new RuntimeException("Esse curso não possui essa disciplina"));

         return foundDisciplinaCurso.getTipo();
    }


    

}
