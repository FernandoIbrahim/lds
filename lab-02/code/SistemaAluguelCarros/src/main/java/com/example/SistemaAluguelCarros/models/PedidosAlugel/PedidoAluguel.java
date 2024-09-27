package com.example.SistemaAluguelCarros.models.PedidosAlugel;


import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
public class PedidoAluguel {

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

    @Column(name = "id_cliente", nullable = false)
    private Long idCliente; //referencia a tabela pessoa_fisica

    @Column(name = "matricula_automovel", nullable = false)
    private Long matriculaAutomovel;

    @JoinColumn(name = "id_proprietario", nullable = false)
    private Long idProprietario; //referencia a tabela usuario

}