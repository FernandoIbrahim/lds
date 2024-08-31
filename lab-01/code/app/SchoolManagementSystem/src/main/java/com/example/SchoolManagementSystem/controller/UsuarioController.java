package com.example.SchoolManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.service.UsuarioService;



public class UsuarioController {
    @Autowired
    static private UsuarioService usuarioService;

    @Autowired
    static public Usuario findById(Long id) {
        return usuarioService.getUsuarioById(id);
        
    }

    @Autowired
    static public Usuario create(String name, String senha, String email, String cpf){
        Usuario usuario = new Usuario(null, name, senha, email, cpf);
        usuarioService.saveOrUpdateUsuario(usuario);
        return usuario;
    }

}
