package com.example.SchoolManagementSystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Curso;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;
import com.example.SchoolManagementSystem.repository.MatriculaDisciplinaRepository;

import jakarta.transaction.Transactional;

@Service
public class MatriculaDisciplinaService {

    @Autowired
    public MatriculaDisciplinaRepository matriculaDisciplinaRepository;

    @Autowired
    public DisciplinaCursoService disciplinaCursoService;


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

    //implementa a regra de negócio na matricula
    public MatriculaDisciplina matricular(Aluno aluno, Disciplina disciplina, EnumDisciplina enumDisciplina){

        Curso curso = aluno.getCurso();

        //verifica a quantidade das obrigatorias
        if(getMatriculasQuantity(aluno, EnumDisciplina.OBRIGATORIA) == 4 && enumDisciplina == EnumDisciplina.OBRIGATORIA){
            throw new RuntimeException("Aluno antigiu seu limite de disciplinas obrigatorias");
        }

        //verifica a quantidade das optatívas
        if(getMatriculasQuantity(aluno, EnumDisciplina.OPTATIVA) == 2 && enumDisciplina == EnumDisciplina.OPTATIVA){
            throw new RuntimeException("Aluno antigiu seu limite de disciplinas optativas");
        }

        //fazemos a verificação se o curso possui a diciplina na categoria selecionada
        if (disciplinaCursoService.cursoContainsDiciplina(curso, disciplina, enumDisciplina)) {

            MatriculaDisciplina matriculaDisciplina = MatriculaDisciplina.builder()
            .aluno(aluno)
            .disciplina(disciplina)
            .dataMatricula(LocalDate.now())
            .build();

            return saveOrUpdateMatriculaDisciplina(matriculaDisciplina);
        }

        throw new RuntimeException("O curso não contem a Diciplina como: " + enumDisciplina);

    }
    

    public List<MatriculaDisciplina> getMatriculasList(Aluno aluno){

            List<MatriculaDisciplina> matriculas = matriculaDisciplinaRepository.findByAluno(aluno);

            if(matriculas.isEmpty()){
                throw new RuntimeException("O aluno não possui disciplinas matriculadas");
            }
            return matriculas;

    }

    //verifica a quantidade de matriculas de um aluno tanto em optativas quanto em obrigatórias
    public int getMatriculasQuantity(Aluno aluno, EnumDisciplina enumDisciplinaRequeired){

        int quantity = 0;

        List<MatriculaDisciplina> matriculas = matriculaDisciplinaRepository.findByAluno(aluno);

        if(matriculas.isEmpty()){
            return 0;
        }

        List<Disciplina> disciplinas = new ArrayList<>();

        for (MatriculaDisciplina matricula : matriculas) {
            disciplinas.add(matricula.getDisciplina());
        }

        for(Disciplina disciplina: disciplinas){
            if(enumDisciplinaRequeired == (disciplinaCursoService.getTipo(aluno.getCurso(), disciplina))){
                quantity++;
            }
        }

        return quantity;

    }

    public  List<Aluno> getAlunosMatriculados(Disciplina disciplina){

        List<MatriculaDisciplina> matriculasNaDisciplina = matriculaDisciplinaRepository.findByDisciplina(disciplina);

        List<Aluno> alunos = new ArrayList<>();

        for (MatriculaDisciplina matriculas : matriculasNaDisciplina) {
                alunos.add(matriculas.getAluno());
        }

        if (alunos.isEmpty()) {
            throw new RuntimeException("Não existe alunos cadastrado nessa disciplina");
        }

        return alunos;

    }

    public List<MatriculaDisciplina> getMatriculadasInSemester(int ano, int semestre) {
        
        List<MatriculaDisciplina> alunos = matriculaDisciplinaRepository.findByAlunoForSemester(ano, semestre);

        if (alunos.isEmpty()) {
            throw new RuntimeException("Nao possui alunos matriculados nesse semestre");
        }

        return alunos;

    }


    @Transactional
    public String deleteMatricula(Aluno aluno, Disciplina disciplina) {
        // Verifica se existe a matrícula
        matriculaDisciplinaRepository
                .findByDisciplinaAndAluno(disciplina, aluno)
                .orElseThrow(() -> new RuntimeException("O aluno " + aluno.getId() + " não possui matrícula na disciplina " + disciplina.getNome()));
    
        // Deleta a matrícula
        matriculaDisciplinaRepository.deleteByAlunoAndDisciplina(aluno, disciplina);
    
        return "Matrícula na disciplina " + disciplina.getNome() + " retirada com sucesso";
    }

    

}
