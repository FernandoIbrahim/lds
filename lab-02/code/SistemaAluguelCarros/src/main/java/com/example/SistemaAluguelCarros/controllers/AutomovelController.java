package com.example.SistemaAluguelCarros.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.models.Automovel.Automovel;
import com.example.SistemaAluguelCarros.repositories.AutomovelRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/automovel")
public class AutomovelController {
    
    @Autowired
    AutomovelRepository automovelRepository;

    @GetMapping
    public ResponseEntity<List<Automovel>> getAllAutomoveis() {
        List<Automovel> automoveis = automovelRepository.findAll();
        return ResponseEntity.ok(automoveis);
    }   

    @PostMapping
    public ResponseEntity<Automovel> createAutomovel(@RequestBody Automovel automovel) {
        Automovel savedAutomovel = automovelRepository.save(automovel);
        return ResponseEntity.ok(savedAutomovel); 
    }
    
    
    
}
