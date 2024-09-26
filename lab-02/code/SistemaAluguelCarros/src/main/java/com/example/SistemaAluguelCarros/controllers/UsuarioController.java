package com.example.SistemaAluguelCarros.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaJuridicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;


    @Autowired
    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable("id") Long id) {
        Usuario user = usuarioRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado!", id));
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> findAll () {
        
        List<Usuario> users = usuarioRepository.findAll();
        return ResponseEntity.ok(users);
            
    }


    @GetMapping("/me")
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
    

    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody @Valid Usuario user) {
        Usuario created = usuarioRepository.save(user);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(uri).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@PathVariable("id") Long id, @RequestBody Usuario user) {
        usuarioRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado!", id));

        Usuario updatedUser = usuarioRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
        Usuario user = this.usuarioRepository.findById(id).get();
        this.usuarioRepository.delete(user);
        return ResponseEntity.noContent().build();
    }

}
