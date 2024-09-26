package com.example.SistemaAluguelCarros.models.PedidosAlugel;


import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.SistemaAluguelCarros.models.Automovel.Automovel;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "pedido_aluguel")
public class Aluguel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "aprovacao", nullable = false)
    private Boolean aprovacao;

    @Column(name = "total", nullable = false, precision = 10, scale = 0)
    private float total;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "data_fim", nullable = false)
    private LocalDate dataFim;

    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "matricula_automovel", nullable = false)
    private Automovel automovel;

}