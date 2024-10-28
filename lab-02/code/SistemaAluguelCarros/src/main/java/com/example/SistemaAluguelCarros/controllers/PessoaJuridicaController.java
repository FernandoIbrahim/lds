package com.example.SistemaAluguelCarros.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.SistemaAluguelCarros.models.usuarios.PessoaJuridica;
import com.example.SistemaAluguelCarros.models.usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.PessoaJuridicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/pessoas-juridicas")
public class PessoaJuridicaController {

    @Autowired
    private PessoaJuridicaRepository pessoaJuridicaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<PessoaJuridica>> getAll() {
        return ResponseEntity.ok(this.pessoaJuridicaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaJuridica> getById(@PathVariable("id") Long id) {
        PessoaJuridica pessoaJuridica = this.pessoaJuridicaRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado!", id));

        return ResponseEntity.ok(pessoaJuridica);
    }

    @PostMapping
    public ResponseEntity<PessoaJuridica> post(@RequestBody PessoaJuridica pessoaJuridica) {

        Usuario user = Usuario.builder()
                .email(pessoaJuridica.getUsuario().getEmail())
                .senha(pessoaJuridica.getUsuario().getSenha())
                .userRole(pessoaJuridica.getUsuario().getUserRole())
                .endereco(pessoaJuridica.getUsuario().getEndereco())
                .build();

        user = usuarioRepository.save(user);
        pessoaJuridica.setUsuario(user);
        PessoaJuridica created = pessoaJuridicaRepository.save(pessoaJuridica);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(uri).body(created);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PessoaJuridica> delete(@PathVariable("id") Long id) {
        this.pessoaJuridicaRepository.findById(id).get();
        this.pessoaJuridicaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PessoaJuridica> put(@PathVariable("id") Long id,
            @RequestBody PessoaJuridica pessoaJuridica) {

        // Buscar a PessoaJuridica pelo ID
        PessoaJuridica person = this.pessoaJuridicaRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Pessoa jurídica não encontrada", id));

        // Verifica se o usuário da pessoa jurídica não é nulo
        if (person.getUsuario() != null) {
            // Atualiza os atributos do usuário se não forem nulos
            if (pessoaJuridica.getUsuario() != null) {
                if (pessoaJuridica.getUsuario().getEmail() != null) {
                    person.getUsuario().setEmail(pessoaJuridica.getUsuario().getEmail());
                }
                if (pessoaJuridica.getUsuario().getSenha() != null) {
                    person.getUsuario().setSenha(pessoaJuridica.getUsuario().getSenha());
                }
                if (pessoaJuridica.getUsuario().getEndereco() != null) {
                    person.getUsuario().setEndereco(pessoaJuridica.getUsuario().getEndereco());
                }
                if (pessoaJuridica.getUsuario().getUserRole() != null) {
                    person.getUsuario().setUserRole(pessoaJuridica.getUsuario().getUserRole());
                }
                // Salva as alterações no usuário
                usuarioRepository.save(person.getUsuario());
            }
        }

        // Atualiza os atributos da pessoa jurídica se não forem nulos
        if (pessoaJuridica.getNomeFantasia() != null) {
            person.setNomeFantasia(pessoaJuridica.getNomeFantasia());
        }
        if (pessoaJuridica.getCnpj() != null) {
            person.setCnpj(pessoaJuridica.getCnpj());
        }

        // Salva as alterações na pessoa jurídica
        pessoaJuridicaRepository.save(person);

        return ResponseEntity.ok(person);
    }

}
