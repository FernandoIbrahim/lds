package com.example.SchoolManagementSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Secretaria;
import com.example.SchoolManagementSystem.repository.SecretariaRepository;

@Service
public class SecretariaService {
    
    @Autowired
    SecretariaRepository secretariaRepository;

    public Secretaria saveOrUpdateProfessor(Secretaria secretaria){
        return secretariaRepository.save(secretaria);
    }

    public Secretaria create(Long id){
        Secretaria secretaria = Secretaria.builder()
            .id(id)
            .build();
        return saveOrUpdateProfessor(secretaria);
    }

}
