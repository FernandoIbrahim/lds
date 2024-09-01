package com.example.SchoolManagementSystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SchoolManagementSystem.model.Usuario;
import com.example.SchoolManagementSystem.model.Enums.EnumAutorizacao;
import com.example.SchoolManagementSystem.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario saveOrUpdateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // Read - Get all users
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    // Read - Get user by ID
    public Usuario findById(Long id) {
        Optional<Usuario> usuario = this.usuarioRepository.findById(id);
        return usuario.orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    // Delete
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario findByEmail(String email) {
        Optional<Usuario> usuario = this.usuarioRepository.findByEmail(email);
        return usuario.orElseThrow(() -> new RuntimeException("Usuario com email " + email + " nao encontrado"));
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

    public Usuario login(String email, String senha){
        
        Usuario usuario = findByEmail(email);

        if(senha.equals(usuario.getSenha())){
            return usuario;

        }else{

            throw new RuntimeException("Erro login inválido");

        }

    }



}
