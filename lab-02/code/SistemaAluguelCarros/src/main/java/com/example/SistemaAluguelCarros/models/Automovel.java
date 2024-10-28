package com.example.SistemaAluguelCarros.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "automovel")
public class Automovel {

    @Id
    @Column(name = "matricula", nullable = false)
    private Long matricula;

    @Column(name = "ano", nullable = false)
    private Integer ano;

    @Column(name = "marca", nullable = false, length = 100)
    private String marca;

    @Column(name = "modelo", nullable = false, length = 100)
    private String modelo;

    @Column(name = "placa", nullable = false, length = 7)
    private String placa;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;
    
}
