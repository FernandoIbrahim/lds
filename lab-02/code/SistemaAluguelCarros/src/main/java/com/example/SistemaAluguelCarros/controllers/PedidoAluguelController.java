package com.example.SistemaAluguelCarros.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SistemaAluguelCarros.models.Automovel.Automovel;
import com.example.SistemaAluguelCarros.models.PedidosAlugel.PedidoAluguel;
import com.example.SistemaAluguelCarros.models.PedidosAlugel.dto.AtualizarPedidoClienteDTO;
import com.example.SistemaAluguelCarros.models.Usuarios.PessoaFisica;
import com.example.SistemaAluguelCarros.models.Usuarios.UserRole;
import com.example.SistemaAluguelCarros.models.Usuarios.Usuario;
import com.example.SistemaAluguelCarros.repositories.AutomovelRepository;
import com.example.SistemaAluguelCarros.repositories.PedidoAluguelRepository;
import com.example.SistemaAluguelCarros.repositories.PessoaFisicaRepository;
import com.example.SistemaAluguelCarros.repositories.UsuarioRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.example.SistemaAluguelCarros.models.PedidosAlugel.dto.RequestPedidoDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/pedido-aluguel")
public class PedidoAluguelController {
    

    @Autowired
    PedidoAluguelRepository pedidoAluguelRepository;

    @Autowired
    AutomovelRepository automovelRepository;
    @Autowired
    UsuarioRepository usuarioRepository;


    @Autowired
    PessoaFisicaRepository pessoaFisicaRepository;


    @PostMapping
    @Operation(summary = "Criar um novo pedido de aluguel", 
               description = "Cria um novo pedido de aluguel ligado ao cliente autenticado com base nas informações fornecidas.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido de aluguel criado com sucesso."),
        @ApiResponse(responseCode = "400", description = "Solicitação inválida. O automóvel pode não existir.")
    })
    public ResponseEntity<PedidoAluguel> post(@RequestBody RequestPedidoDTO pedidoAluguelDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            System.out.println("usuário não autenticado");
            return ResponseEntity.badRequest().build();
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(authentication.getName());
        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Usuario usuarioAutenticado = usuarioOptional.get();


        if (!usuarioAutenticado.getUserRole().equals(UserRole.CLIENTE)) {
            System.out.println("O usuário não é um cliente para realizar um pedido de aluguel");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }


        Optional<Automovel> automovel = automovelRepository.findById(pedidoAluguelDTO.matriculaAutomovel());

        if(!automovel.isPresent()){
            System.out.println("O sistema não possui altomóvel com o id informado");
            return ResponseEntity.badRequest().build();
        }


        

        Automovel realAutomovel = automovel.get();
        PedidoAluguel pedidoAluguel = new PedidoAluguel();
        

        System.out.println(pedidoAluguelRepository.isAutomovelDisponivel(realAutomovel.getMatricula(), pedidoAluguelDTO.dataInicio(), pedidoAluguelDTO.dataFim()));

        if(!pedidoAluguelRepository.isAutomovelDisponivel(realAutomovel.getMatricula(), pedidoAluguelDTO.dataInicio(), pedidoAluguelDTO.dataFim())){
            System.out.println("Automovel nas datas informadas indisponível");
            return ResponseEntity.badRequest().build();
        }
        
        pedidoAluguel.setMatriculaAutomovel(realAutomovel.getMatricula());
        pedidoAluguel.setIdProprietario(realAutomovel.getIdUsuario());
        pedidoAluguel.setDataInicio(pedidoAluguelDTO.dataInicio());
        pedidoAluguel.setDataFim(pedidoAluguelDTO.dataFim());
        pedidoAluguel.setTotal(pedidoAluguelDTO.total());
        pedidoAluguel.setAprovacao(false);
        pedidoAluguel.setIdCliente(usuarioAutenticado.getId());


        PedidoAluguel savedPedidoAluguel = pedidoAluguelRepository.save(pedidoAluguel);
        return ResponseEntity.ok(savedPedidoAluguel); 

    }


    @GetMapping("/{id}")
    @Operation(summary = "Buscar pedido de aluguel por ID", 
    description = "Retorna os detalhes de um pedido de aluguel com base no ID fornecido. " +
                  "Verifica se o usuário autenticado é o proprietário ou o cliente do pedido.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido encontrado com sucesso."),
        @ApiResponse(responseCode = "403", description = "Acesso proibido. O usuário não é proprietário ou cliente do pedido."),
        @ApiResponse(responseCode = "400", description = "Solicitação inválida.")
    })
    public ResponseEntity<PedidoAluguel> getById(@PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(authentication.getName());

        Optional<PedidoAluguel> optionalPedido = pedidoAluguelRepository.findById(id);

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Usuario usuarioAutenticado = usuarioOptional.get();
        Optional<PessoaFisica> optionalPessoaFisica = pessoaFisicaRepository.findByUsuario(usuarioAutenticado);


        //caso seja proprietario
        if (optionalPedido.isPresent()) {
            PedidoAluguel existingPedido = optionalPedido.get();

            if (usuarioAutenticado.getId() == existingPedido.getIdProprietario()) {
                return ResponseEntity.ok(existingPedido);
            }
        }


        //caso seja cliente
        if (optionalPedido.isPresent() &&  optionalPessoaFisica.isPresent()) {
            PedidoAluguel existingPedido = optionalPedido.get();
            PessoaFisica existingClientePF = optionalPessoaFisica.get();

            if (existingPedido.getIdCliente().equals(existingClientePF.getId()) ) {
                return ResponseEntity.ok(existingPedido);
            }
        }

        
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

    }

    @Operation(summary = "Atualizar pedido de aluguel", 
               description = "Atualiza as informações de um pedido de aluguel existente com base no ID e nos dados fornecidos.")
    @PutMapping("/{id}")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pedido de aluguel atualizado com sucesso."),
        @ApiResponse(responseCode = "403", description = "Acesso proibido. O usuário não é o proprietário do pedido."),
        @ApiResponse(responseCode = "404", description = "Pedido de aluguel não encontrado.")
    })
    public ResponseEntity<PedidoAluguel> put(@PathVariable Long id, @RequestBody AtualizarPedidoClienteDTO atualizarPedidoDTO) {

        // Busca o pedido de aluguel pelo ID
        Optional<PedidoAluguel> optionalPedido = pedidoAluguelRepository.findById(id);

        // Busca o usuário autenticado
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(authentication.getName());

        if (!usuarioOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Usuario usuarioAutenticado = usuarioOptional.get();

        Optional<PessoaFisica> optionalPessoaFisica = pessoaFisicaRepository.findByUsuario(usuarioAutenticado);

        // Verifica se o pedido existe
        if (optionalPedido.isPresent() && optionalPessoaFisica.isPresent()) {

            PedidoAluguel existingPedido = optionalPedido.get();
            PessoaFisica existingClientePF = optionalPessoaFisica.get();

            // Verifica se o pedido pertence ao usuário autenticado
            if (!existingPedido.getIdCliente().equals(existingClientePF.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Retorna 403 Forbidden
            }



            if (atualizarPedidoDTO.dataInicio() != null) {
                existingPedido.setDataInicio(atualizarPedidoDTO.dataInicio());
            }
    
            if (atualizarPedidoDTO.dataFim() != null) {
                existingPedido.setDataFim(atualizarPedidoDTO.dataFim());
            }
    
            if (atualizarPedidoDTO.totalPedido() != null) {
                existingPedido.setTotal(atualizarPedidoDTO.totalPedido());
            }

            // Salva as atualizações
            PedidoAluguel updatedPedidoAluguel = pedidoAluguelRepository.save(existingPedido);

            return ResponseEntity.ok(updatedPedidoAluguel);
        } else {
            // Retorna 404 Not Found caso o pedido não seja encontrado
            return ResponseEntity.notFound().build();
        }

    }


    
    


}
