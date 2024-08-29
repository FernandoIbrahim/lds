# Inicialização do Projeto

Para iniciar o projeto de maneira eficiente e portátil, utilizamos o Docker Compose. Certifique-se de que o Docker esteja instalado na sua máquina local antes de prosseguir.


## Comandos para Execução
- **Iniciar o Projeto**
Use o comando abaixo para construir e iniciar os containers:
```
docker-compose up --build
```

- **Finalizar a Execução**
Para parar e remover os containers, use:
```
docker-compose down
```

---

Sendo assim, podemos perceber que serão criados dois containers:

- app-school-management
    O qual é o responsável por rodar uma imagem openjdk:17-jdk-slim, assim rodando o Java com SpringBoot

- bc-mariadb-school-management-system
    O qual é o responsável por rodar uma imagem mariadb:latest, assim rodando o banco de dados relacional Mariadb junto com seus dados iniciais.