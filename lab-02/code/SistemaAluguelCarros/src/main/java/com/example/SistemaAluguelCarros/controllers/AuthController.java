package com.example.SistemaAluguelCarros.controllers;

import java.util.Optional;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.SistemaAluguelCarros.infraSecurity.TokenService;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.models.Usuarios.UserRole;
import com.example.SistemaAluguelCarros.models.Usuarios.dto.LoginRequestDTO;
import com.example.SistemaAluguelCarros.models.Usuarios.dto.ResgisterRequestDTO;
import com.example.SistemaAluguelCarros.models.Usuarios.dto.ResponseDTO;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        Usuario usuario = this.usuarioRepository.findByEmail(body.email()).orElseThrow( () -> new RuntimeException("User not found"));


        System.out.println("As senhas " + usuario.getSenha() + "  " +  body.senha() );

        if(passwordEncoder.matches(body.senha(), usuario.getSenha())){
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok(new ResponseDTO(usuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register/agente")
    public ResponseEntity registerEmpresa(@RequestBody ResgisterRequestDTO body){

        Optional<Usuario> usuario = this.usuarioRepository.findByEmail(body.email());

        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();

            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setEndereco(body.endereco());
            novoUsuario.setUserRole(UserRole.AGENTE);

            usuarioRepository.save(novoUsuario);

            String token = this.tokenService.generateToken(novoUsuario);
            return ResponseEntity.ok(new ResponseDTO(novoUsuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }




    @PostMapping("/register/cliente")
    public ResponseEntity registerCliente(@RequestBody ResgisterRequestDTO body){

        Optional<Usuario> usuario = this.usuarioRepository.findByEmail(body.email());

        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();

            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setEndereco(body.endereco());
            novoUsuario.setUserRole(UserRole.CLIENTE);

            usuarioRepository.save(novoUsuario);

            String token = this.tokenService.generateToken(novoUsuario);
            return ResponseEntity.ok(new ResponseDTO(novoUsuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }

}
