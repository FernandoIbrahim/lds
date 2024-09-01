package com.example.SchoolManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.SchoolManagementSystem.model.Aluno;
import com.example.SchoolManagementSystem.model.Disciplina;
import com.example.SchoolManagementSystem.model.MatriculaDisciplina;
import java.util.List;


public interface MatriculaDisciplinaRepository extends JpaRepository<MatriculaDisciplina, Long>{
    List<MatriculaDisciplina> findByAluno(Aluno aluno);
    List<MatriculaDisciplina> findByDisciplina(Disciplina disciplina);

    @Query(value = """
        SELECT 
            u.* 
        FROM 
            `school-management-system-bd`.matricula_disciplina md
        INNER JOIN 
            usuario u ON md.id_aluno = u.id  
        INNER JOIN 
            disciplina d ON md.id_disciplina = d.id
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
    List<Aluno> findByAlunoForSemester(@Param("year") int ano, @Param("sem") int semestre);
}
