package com.example.SchoolManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.service.UsuarioService;



public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    public Usuario findById(Long id) {
        return this.usuarioService.getUsuarioById(id);
        
    }

    public Usuario create(String name, String senha, String email, String cpf){
        Usuario usuario = new Usuario(null, name, senha, email, cpf);
        this.usuarioService.saveOrUpdateUsuario(usuario);
        return usuario;
    }
}
