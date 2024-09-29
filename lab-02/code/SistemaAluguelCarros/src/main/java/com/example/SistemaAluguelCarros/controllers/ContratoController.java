package com.example.SistemaAluguelCarros.controllers;


import com.example.SistemaAluguelCarros.models.Contratos.Contrato;
import com.example.SistemaAluguelCarros.repositories.ContratoRepository;

import java.util.Optional;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.validator.internal.engine.PredefinedScopeValidatorContextImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.SistemaAluguelCarros.repositories.PedidoAluguelRepository;
import java.time.LocalDate;
import com.example.SistemaAluguelCarros.models.PedidosAlugel.PedidoAluguel;



import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/contratos")
public class ContratoController {

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private PedidoAluguelRepository pedidoAluguelRepository;

    @GetMapping
    public ResponseEntity<List<Contrato>> getAll() {
        List<Contrato> contratos = contratoRepository.findAll();
        return ResponseEntity.ok(contratos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contrato> getById(@PathVariable Long id) {
        Contrato contrato = contratoRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Contrato não encontrado!", id));
        return ResponseEntity.ok(contrato);
    }

    @PostMapping
    public ResponseEntity<Contrato> create(@RequestBody Contrato contrato) {
        
        contrato.setDataAprovacao(LocalDate.now());
        Optional<PedidoAluguel> pedidoAluguelOptional = pedidoAluguelRepository.findById(contrato.getIdPedido());
        
        if(!pedidoAluguelOptional.isPresent())  
            return ResponseEntity.badRequest().build();
        
        PedidoAluguel pedidoAluguel = pedidoAluguelOptional.get();
                
        if(pedidoAluguel.getAprovacao() == true)
            return ResponseEntity.badRequest().build();

        
        pedidoAluguel.setAprovacao(true);
        pedidoAluguelRepository.save(pedidoAluguel);

        Contrato created = contratoRepository.save(contrato);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(uri).body(created);
    }

    // Atualizar contrato por ID
    @PutMapping("/{id}")
    public ResponseEntity<Contrato> update(@PathVariable Long id, @RequestBody Contrato contratoDetails) {
        Contrato contrato = contratoRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Contrato não encontrado!", id));

        if (contratoDetails.getNumeroContrato() != null) {
            contrato.setNumeroContrato(contratoDetails.getNumeroContrato());
        }
        if (contratoDetails.getDataAprovacao() != null) {
            contrato.setDataAprovacao(contratoDetails.getDataAprovacao());
        }
        if (contratoDetails.getIdPedido() != null) {
            contrato.setIdPedido(contratoDetails.getIdPedido());
        }

        Contrato updated = contratoRepository.save(contrato);
        return ResponseEntity.ok(updated);
    }

    // Deletar contrato por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Contrato contrato = contratoRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Contrato não encontrado!", id));

        contratoRepository.delete(contrato);
        return ResponseEntity.noContent().build();
    }
}

