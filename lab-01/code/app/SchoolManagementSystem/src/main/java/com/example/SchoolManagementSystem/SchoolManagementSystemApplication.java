package com.example.SchoolManagementSystem;

import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.model.Enums.EnumAutorizacao;
import com.example.SchoolManagementSystem.service.AlunoService;
import com.example.SchoolManagementSystem.service.LoginService;
import com.example.SchoolManagementSystem.service.UsuarioService;

@SpringBootApplication
public class SchoolManagementSystemApplication implements CommandLineRunner {


	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private AlunoService alunoService;

	Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
        // Interação de exemplo com o controller
		cadastrarAluno();

    }


	public void loginCLI(){
		
		String email;
		String senha;

		System.out.println("Digite as credênciais de acesso: ");
		System.out.println("email: ");
		email = scanner.nextLine();
		System.out.println("senha: ");
		senha = scanner.nextLine();

		String acesso = LoginService.login(email, senha);

		switch (acesso) {
			case "PROFESSOR":
				professorCLI();
				break;
			case "SECRETARIA":
				secretariaCLI();
				break;
			case "ALUNO":
				alunoCLI();
				break;
			default:
				System.out.println("Acesso inválido!");
				break;
		}

	}


	public void secretariaCLI(){
		System.out.println("Digite uma das opções: ");
		System.out.println("01 - Cadastrar Aluno");
		System.out.println("02 - Cadastrar Secretaria");
		System.out.println("03 - Cadastrar Secretaria");

	}


	public void alunoCLI(){
		
	}

	public void professorCLI(){
		
	}


	public void cadastrarAluno(){

		String nome, senha, email, cpf;

		System.out.println("Informes os dados necessários: ");
		System.out.println("Nome: ");
		nome = scanner.nextLine();

		System.out.println("E-mail: ");
		email = scanner.nextLine();

		System.out.println("senha: ");
		senha = scanner.nextLine();

		System.out.println("cpf: ");
		cpf = scanner.nextLine();

		Usuario usuario = usuarioService.create(nome, senha, email, cpf, EnumAutorizacao.ALUNO);
		alunoService.create(usuario.getId());
	
		System.out.println("Aluno criado com sucesso!" + usuario.getId());
	}




}
