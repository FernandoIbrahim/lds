package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.model.Enums.EnumAutorizacao;
import com.example.SchoolManagementSystem.model.Enums.EnumDisciplina;
import com.example.SchoolManagementSystem.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario saveOrUpdateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Read - Get all users
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // Read - Get user by ID
    public Usuario getUsuarioById(Long id) {
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    // Delete
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }


    //-------------------------------------------------------------

    public Usuario create(String name, String senha, String email, String cpf, EnumAutorizacao tipo) {
        Usuario usuario =  Usuario.builder()
            .nome(name)
            .senha(senha)
            .email(email)
            .cpf(cpf)
            .tipo(tipo)
            .build();
        
        return saveOrUpdateUsuario(usuario);
    }



}
