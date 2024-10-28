package com.example.SistemaAluguelCarros.controllers;

import java.util.Optional;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.dtos.auth.LoginRequestDTO;
import com.example.SistemaAluguelCarros.dtos.auth.RegistrarPessoaFisicaRequestDTO;
import com.example.SistemaAluguelCarros.dtos.auth.RegistrarPessoaJuridicaRequestDTO;
import com.example.SistemaAluguelCarros.dtos.auth.ResponseRegisterDTO;
import com.example.SistemaAluguelCarros.infra_security.TokenService;
import com.example.SistemaAluguelCarros.models.usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.usuarios.UserRole;
import com.example.SistemaAluguelCarros.models.usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaJuridicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final PessoaFisicaRepository pessoaFisicaRepository;
    private final PessoaJuridicaRepository pessoaJuridicaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;


    @Operation(summary = "Login de usuário", description = "Autenticação do usuário e geração de token JWT.")
    @PostMapping("/login")
    public ResponseEntity<ResponseRegisterDTO> login(@RequestBody LoginRequestDTO body){
        Usuario usuario = this.usuarioRepository.findByEmail(body.email()).orElseThrow( () -> new RuntimeException("User not found"));


        System.out.println("As senhas " + usuario.getSenha() + "  " +  body.senha() );

        if(passwordEncoder.matches(body.senha(), usuario.getSenha())){
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok(new ResponseRegisterDTO(usuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @Operation(summary = "Registro de cliente", description = "Registro de um novo cliente e geração de token JWT.")
    @PostMapping("/registro/cliente")
    public ResponseEntity<ResponseRegisterDTO> registerCliente(@RequestBody RegistrarPessoaFisicaRequestDTO body){

        Optional<Usuario> usuario = this.usuarioRepository.findByEmail(body.email());

        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();

            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setEndereco(body.endereco());
            novoUsuario.setUserRole(UserRole.CLIENTE);

            usuarioRepository.save(novoUsuario);

            PessoaFisica pessoaFisica = new PessoaFisica(null, novoUsuario, body.nome(), body.rg(), body.cpf(), body.profissao(), body.empregadora());

            pessoaFisicaRepository.save(pessoaFisica);

            String token = this.tokenService.generateToken(novoUsuario);
            return ResponseEntity.ok(new ResponseRegisterDTO(novoUsuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }

    @Operation(summary = "Registro de agente", description = "Registro de um novo agente e geração de token JWT.")
    @PostMapping("/registro/agente")
    public ResponseEntity<ResponseRegisterDTO>  registerAgente(@RequestBody RegistrarPessoaJuridicaRequestDTO body){

        Optional<Usuario> usuario = this.usuarioRepository.findByEmail(body.email());

        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();

            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setEndereco(body.endereco());
            novoUsuario.setUserRole(UserRole.AGENTE);

            usuarioRepository.save(novoUsuario);

            PessoaJuridica novaPessoaJuridica = new PessoaJuridica(null, novoUsuario, body.nomeFantasia(), body.cnpj());
            pessoaJuridicaRepository.save(novaPessoaJuridica);

            String token = this.tokenService.generateToken(novoUsuario);
            return ResponseEntity.ok(new ResponseRegisterDTO(novoUsuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }
    
}
