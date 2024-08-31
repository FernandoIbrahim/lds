package com.example.SchoolManagementSystem;

import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.service.UsuarioService;

@SpringBootApplication
public class SchoolManagementSystemApplication implements CommandLineRunner {


	@Autowired
	private UsuarioService usuarioService;


	Scanner scanner = new Scanner(System.in);

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
        // Interação de exemplo com o controller
        Usuario usuario = usuarioService.create("Fernando", "1234", "fernando@example.com", "12345678900");
        System.out.println("Usuário criado: " + usuario.getNome());

    }




	public void loginCLI(){
		
		String email;
		String senha;

		System.out.println("Digite as credênciais de acesso: ");
		System.out.println("email: ");
		email = scanner.nextLine();
		System.out.println("senha: ");
		senha = scanner.nextLine();

	}


	public void secretariaCLI(){
		System.out.println("Digite uma das opções: ");
		System.out.println("01 - Cadastrar Aluno");
		System.out.println("02 - Cadastrar Secretaria");
		System.out.println("03 - Cadastrar Secretaria");

	}


	public void ClienteCLI(){
		
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

		System.out.println("senha: ");
		cpf = scanner.nextLine();

		Usuario usuario = usuarioService.create(nome, senha, email, cpf);

	}




}
