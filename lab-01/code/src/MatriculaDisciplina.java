package app;

import java.time.LocalDate;

public class MatriculaDisciplina {

    private long id;
    private LocalDate dataDaMatricula;
    private int semestre;

    public MatriculaDisciplina(long id, LocalDate dataDaMatricula, int semestre) {
        this.id = id;
        this.dataDaMatricula = dataDaMatricula;
        this.semestre = semestre;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDataDaMatricula() {
        return dataDaMatricula;
    }

    public void setDataDaMatricula(LocalDate dataDaMatricula) {
        this.dataDaMatricula = dataDaMatricula;
    }

    public int getSemestre() {
        return semestre;
    }

    public void setSemestre(int semestre) {
        this.semestre = semestre;
    }
}
