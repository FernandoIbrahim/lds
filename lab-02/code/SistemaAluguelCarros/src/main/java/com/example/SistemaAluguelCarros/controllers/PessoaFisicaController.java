package com.example.SistemaAluguelCarros.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.net.URI;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/pessoa-fisica")
public class PessoaFisicaController {
    
    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<PessoaFisica>> getAll() {
        return ResponseEntity.ok(this.pessoaFisicaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaFisica> getMethodName(@PathVariable("id") Long id) {
        PessoaFisica pessoaFisica = this.pessoaFisicaRepository.findById(id)
            .orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado!", id));

        return ResponseEntity.ok(pessoaFisica);
    }

    @PostMapping
    public ResponseEntity<PessoaFisica> post(@RequestBody PessoaFisica pessoaFisica) {
        
        

        Usuario user = Usuario.builder()
            .email(pessoaFisica.getUsuario().getEmail())
            .senha(pessoaFisica.getUsuario().getSenha())
            .status(pessoaFisica.getUsuario().getStatus())
            .endereco(pessoaFisica.getUsuario().getEndereco())
            .build();
        
        user = usuarioRepository.save(user);
        pessoaFisica.setUsuario(user);
        PessoaFisica created = pessoaFisicaRepository.save(pessoaFisica);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(uri).body(created);

         
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PessoaFisica> delete(@PathVariable("id") Long id){
        this.pessoaFisicaRepository.findById(id).get();
        this.pessoaFisicaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}")
public ResponseEntity<PessoaFisica> update(@PathVariable("id") Long id, @RequestBody PessoaFisica pessoaFisica) {
    
    // Buscar a PessoaFisica pelo ID
    PessoaFisica person = this.pessoaFisicaRepository.findById(id)
        .orElseThrow(() -> new ObjectNotFoundException("Pessoa física não encontrada", id));
    
    // Atualiza os atributos do usuário se não forem nulos
    if (person.getUsuario() != null) {
        if (pessoaFisica.getUsuario() != null) {
            if (pessoaFisica.getUsuario().getEmail() != null) {
                person.getUsuario().setEmail(pessoaFisica.getUsuario().getEmail());
            }
            if (pessoaFisica.getUsuario().getSenha() != null) {
                person.getUsuario().setSenha(pessoaFisica.getUsuario().getSenha());
            }
            if (pessoaFisica.getUsuario().getEndereco() != null) {
                person.getUsuario().setEndereco(pessoaFisica.getUsuario().getEndereco());
            }
            if (pessoaFisica.getUsuario().getStatus() != null) {
                person.getUsuario().setStatus(pessoaFisica.getUsuario().getStatus());
            }
            // Salva as alterações no usuário
            usuarioRepository.save(person.getUsuario());
        }
    }

    // Atualiza os atributos da pessoa física se não forem nulos
    if (pessoaFisica.getNome() != null) {
        person.setNome(pessoaFisica.getNome());
    }
    if (pessoaFisica.getRg() != null) {
        person.setRg(pessoaFisica.getRg());
    }
    if (pessoaFisica.getCpf() != null) {
        person.setCpf(pessoaFisica.getCpf());
    }
    if (pessoaFisica.getProfissao() != null) {
        person.setProfissao(pessoaFisica.getProfissao());
    }
    if (pessoaFisica.getEmpregadora() != null) {
        person.setEmpregadora(pessoaFisica.getEmpregadora());
    }

    pessoaFisicaRepository.save(person);
    
    return ResponseEntity.ok(person);
}


}
