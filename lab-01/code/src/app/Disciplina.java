package app;

public class Disciplina {

    String nome;
    Long codigo;
    double credito;
    int maximoAlunos;

    public Disciplina(String nome, Long codigo, double credito, int maximoAlunos) {
        setNome(nome);
        setCodigo(codigo);
        setCredito(credito);
        setMaximoAlunos(maximoAlunos);
    }


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public double getCredito() {
        return credito;
    }

    public void setCredito(double credito) {
        this.credito = credito;
    }

    public int getMaximoAlunos() {
        return maximoAlunos;
    }

    public void setMaximoAlunos(int maximoAlunos) {
        this.maximoAlunos = maximoAlunos;
    }



    
}
