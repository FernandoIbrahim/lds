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
    public ResponseEntity<PessoaFisica> post( @RequestBody PessoaFisica pessoaFisica) {
        
        

        /**Usuario user = Usuario.builder()
            .email(pessoaFisica.getUsuario().getEmail())
            .senha(pessoaFisica.getUsuario().getSenha())
            .status(pessoaFisica.getUsuario().getStatus())
            .build();**/
        
        // user = usuarioRepository.save(user);
        // pessoaFisica.setUsuario(user);
        PessoaFisica created = pessoaFisicaRepository.save(pessoaFisica);

        /**URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();**/

        return ResponseEntity.ok(created);

         
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PessoaFisica> delete(@PathVariable("id") Long id){
        PessoaFisica person = this.pessoaFisicaRepository.findById(id).get();
        this.pessoaFisicaRepository.delete(person);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PessoaFisica> update(@PathVariable("id") Long id, @RequestBody PessoaFisica pessoaFisica) {
        
        PessoaFisica person = this.pessoaFisicaRepository.findById(id)
            .orElseThrow(() -> new ObjectNotFoundException("Pessoa fisica não encontrada", id));
        
        

        pessoaFisicaRepository.save(person);
        
        return ResponseEntity.ok(person);
    }

    
    
    
    

}
