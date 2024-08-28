package app;

public class Disciplina {

    private String nome;
    private Long id;
    private int cargaHoraria;
    private int maximoAlunos;

    public Disciplina(String nome, Long id, int cargaHoraria, int maximoAlunos) {
        setNome(nome);
        setid(id);
        setCargaHoraria(cargaHoraria);
        setMaximoAlunos(maximoAlunos);
    }


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getid() {
        return id;
    }

    public void setid(Long id) {
        this.id = id;
    }

    public int getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(int cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public int getMaximoAlunos() {
        return maximoAlunos;
    }

    public void setMaximoAlunos(int maximoAlunos) {
        this.maximoAlunos = maximoAlunos;
    }



    
}
