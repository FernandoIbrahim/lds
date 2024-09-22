package com.example.SistemaAluguelCarros;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("School Management API")
                .description("API para gerenciamento de uma escola, incluindo usuários, matrículas e disciplinas.")
                .version("1.0.0"))
            .servers(List.of(new Server().url("http://localhost:8080")));
    }
}
