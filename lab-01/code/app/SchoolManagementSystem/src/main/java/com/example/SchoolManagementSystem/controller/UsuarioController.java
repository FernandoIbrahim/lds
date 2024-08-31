package com.example.SchoolManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.service.UsuarioService;


@Controller
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    
    public Usuario findById(Long id) {
        return usuarioService.getUsuarioById(id);
        
    }

    public Usuario create(String name, String senha, String email, String cpf){
        Usuario usuario = new Usuario(null, name, senha, email, cpf);
        usuarioService.saveOrUpdateUsuario(usuario);
        return usuario;
    }

}
