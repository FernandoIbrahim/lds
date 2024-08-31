package com.example.SchoolManagementSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.SchoolManagementSystem.controller.UsuarioController;
import com.example.SchoolManagementSystem.model.Usuario;

@SpringBootApplication
public class SchoolManagementSystemApplication implements CommandLineRunner {


	@Autowired
	private UsuarioController usuarioController;

	public static void main(String[] args) {
		SpringApplication.run(SchoolManagementSystemApplication.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
        // Interação de exemplo com o controller
        Usuario usuario = usuarioController.create("Fernando", "1234", "fernando@example.com", "12345678900");
        System.out.println("Usuário criado: " + usuario.getNome());

    }

}
