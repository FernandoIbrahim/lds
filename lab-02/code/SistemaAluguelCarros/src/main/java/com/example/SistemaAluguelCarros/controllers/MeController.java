package com.example.SistemaAluguelCarros.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.models.PedidosAlugel.PedidoAluguel;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.PedidoAluguelRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaJuridicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

@RestController
@RequestMapping("/me")
public class MeController {
    

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Autowired
    private PedidoAluguelRepository pedidoAluguelRepository;


    @Autowired

    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @GetMapping
    public ResponseEntity findUserOwnData() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Usuario> usuario = usuarioRepository.findByEmail(authentication.getName());

        Usuario findedUsuario = usuario.orElseThrow( () -> new RuntimeException("Usuario Não encontrado"));

        System.out.println(findedUsuario.getUsername());
        System.out.println(findedUsuario.getId());

        Optional<PessoaFisica> pessoaFisica = pessoaFisicaRepository.findByUsuario(findedUsuario);

        if(pessoaFisica.isPresent()){
            return ResponseEntity.ok(pessoaFisica.orElseThrow( () -> new RuntimeException("Pessoa Física não encontrada")));
        }


        Optional<PessoaJuridica> pessoaJuridica = pessoaJuridicaRepository.findByUsuario(findedUsuario);
        if(pessoaJuridica.isPresent()){
            return ResponseEntity.ok(pessoaJuridica.orElseThrow( () -> new RuntimeException("Pessoa Juridica não encontrada")));
        }

        System.out.println("Dados do usuário não encontrado");

        return ResponseEntity.badRequest().build();

    }


    @GetMapping("/pedido-aluguel/locatario")
    public ResponseEntity<List<PedidoAluguel>> getAllLocatario() {

        //procura o usuário
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Usuario> usuario = usuarioRepository.findByEmail(authentication.getName());

        if(!usuario.isPresent()){
            return ResponseEntity.notFound().build(); //se não estiver presente lança a exeção
        }

        Usuario findedUsuario = usuario.orElseThrow( () -> new RuntimeException("Seu usuario não encontrado"));

        //verificar se o usuário é uma pessoa física a qual pode fazer alugar veículos
        Optional<PessoaFisica> pessoaFisica = pessoaFisicaRepository.findByUsuario(findedUsuario);

        if(!pessoaFisica.isPresent()){
            return ResponseEntity.notFound().build(); //caso não seja retorna um erro
        }

        PessoaFisica findeedPessoaFisica = pessoaFisica.orElseThrow(() -> new RuntimeException("Seu usuario é um Agente, não podendo alugar veículos"));
        return ResponseEntity.ok(pedidoAluguelRepository.findByIdCliente(findeedPessoaFisica.getId()));

    }


    @GetMapping("/pedido-aluguel/locador")
    public ResponseEntity<List<PedidoAluguel>> getAllLocador() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Usuario> usuario = usuarioRepository.findByEmail(authentication.getName());


        Usuario findedUsuario = usuario.orElseThrow( () -> new RuntimeException("Seu usuario não encontrado"));
        return ResponseEntity.ok(pedidoAluguelRepository.findByIdProprietario(findedUsuario.getId()));

    }


}
