package com.example.SistemaAluguelCarros.models.Usuarios;

import org.aspectj.lang.annotation.control.CodeGenerationHint;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "pessoa_fisica")
public class PessoaFisica {

    /* @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id; */

    @OneToOne
    @JoinColumn(name = "id_usuario", nullable = false) 
    private Usuario usuario;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "rg", nullable = false, unique = true)
    private String rg;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Column(name = "endereco", nullable = false)
    private String endereco;

    @Column(name = "profissao", nullable = true)
    private String profissao;

    @Column(name = "empregadora", nullable = true)
    private String empregadora;

}
