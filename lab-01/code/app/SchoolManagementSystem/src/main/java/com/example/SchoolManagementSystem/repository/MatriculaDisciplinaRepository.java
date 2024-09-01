package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;

import java.util.List;
import java.util.Optional;


public interface MatriculaDisciplinaRepository extends JpaRepository<MatriculaDisciplina, Long>{
    List<MatriculaDisciplina> findByAluno(Aluno aluno);
    List<MatriculaDisciplina> findByDisciplina(Disciplina disciplina);
    Optional<MatriculaDisciplina> findByDisciplinaAndAluno(Disciplina disciplina, Aluno aluno);


    @Modifying
    @Query("DELETE FROM MatriculaDisciplina md WHERE md.aluno = :aluno AND md.disciplina = :disciplina")
    int deleteByAlunoAndDisciplina(@Param("aluno") Aluno aluno, @Param("disciplina") Disciplina disciplina);

    @Query(value = """
        SELECT 
            md.*
        FROM 
            `school-management-system-bd`.matricula_disciplina md
        INNER JOIN (
            SELECT 
                md.id, 
                CASE 
                    WHEN QUARTER(md.data_matricula) >= 3 THEN 2
                    ELSE 1
                END AS semestre
            FROM 
                `school-management-system-bd`.matricula_disciplina md
        ) AS st ON md.id = st.id
        WHERE 
            st.semestre = :sem
        AND
            YEAR(md.data_matricula) = :year;
    """, nativeQuery = true)
    List<MatriculaDisciplina> findByAlunoForSemester(@Param("year") int ano, @Param("sem") int semestre);
}
