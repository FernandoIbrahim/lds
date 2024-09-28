package com.example.SistemaAluguelCarros.controllers;

import java.util.Optional;


import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.infraSecurity.TokenService;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.models.Auth.dto.LoginRequestDTO;
import com.example.SistemaAluguelCarros.models.Auth.dto.ResgisterPessoaFisicaRequestDTO;
import com.example.SistemaAluguelCarros.models.Auth.dto.ResgisterPessoaJuridicaRequestDTO;
import com.example.SistemaAluguelCarros.models.Auth.dto.ResponseRegisterDTO;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.Usuarios.UserRole;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaJuridicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

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


    @PostMapping("/login")
    public ResponseEntity<ResponseRegisterDTO>  login(@RequestBody LoginRequestDTO body){
        Usuario usuario = this.usuarioRepository.findByEmail(body.email()).orElseThrow( () -> new RuntimeException("User not found"));


        System.out.println("As senhas " + usuario.getSenha() + "  " +  body.senha() );

        if(passwordEncoder.matches(body.senha(), usuario.getSenha())){
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok(new ResponseRegisterDTO(usuario.getEmail(), token));
        }

        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register/cliente")
    public ResponseEntity<ResponseRegisterDTO> registerCliente(@RequestBody ResgisterPessoaFisicaRequestDTO body){

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

    
    @PostMapping("/register/agente")
    public ResponseEntity<ResponseRegisterDTO>   registerCliente(@RequestBody ResgisterPessoaJuridicaRequestDTO body){

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
