package com.example.SistemaAluguelCarros.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.dtos.automovel.CadastrarAutomovelDTO;
import com.example.SistemaAluguelCarros.models.Automovel;
import com.example.SistemaAluguelCarros.models.usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.AutomovelRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/automoveis")
public class AutomovelController {
    
    @Autowired
    AutomovelRepository automovelRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<List<Automovel>> getAll() {
        List<Automovel> automoveis = automovelRepository.findAll();
        return ResponseEntity.ok(automoveis);
    }   

    @PostMapping
    public ResponseEntity<Automovel> post(@RequestBody CadastrarAutomovelDTO cadastrarAutomovelDTO) {

        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || authentication.getName() == null) {
            System.out.println("usuário não autenticado");
            return ResponseEntity.badRequest().build();
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(authentication.getName());
        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Usuario findedUsuario = usuarioOptional.get();
        Automovel newAutomovel = new Automovel(cadastrarAutomovelDTO.matricula(), cadastrarAutomovelDTO.ano(), cadastrarAutomovelDTO.marca(), cadastrarAutomovelDTO.modelo(), cadastrarAutomovelDTO.placa(), findedUsuario.getId());

        Automovel savedAutomovel = automovelRepository.save(newAutomovel);
        return ResponseEntity.ok(savedAutomovel); 

    }
    
    
    
}
