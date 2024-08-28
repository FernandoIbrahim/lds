package app;

public abstract class Usuario{

    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;

    Usuario(Long id, String nome , String email, String senha, String cpf){
        this.id = id;
        setNome(nome);
        setEmail(email);
        setCpf(cpf);
        setSenha(senha);
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}