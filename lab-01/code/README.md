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

- **app-school-management**
O qual é o responsável por rodar uma imagem openjdk:17-jdk-slim, assim implementado o Java com SpringBoot

- **bc-mariadb-school-management-system**
O qual é o responsável por rodar uma imagem mariadb:latest, assim implementado o banco de dados relacional Mariadb junto com seu entrypoint.

--- 

# Testes

## Conexão
O teste de conexão entre o Spring e o Banco de dados pode ser realizada da seguinte forma:

Inicialize o banco de dados através do seguinte comando:

```
docker-compose up mariadb --build
```

Execute separadamente o teste **testDatabaseConnection** presente no diretório 

```/app/SchoolManagementSystem/src/test/java/com/example/SchoolManagementSystem/SchoolManagementSystemApplicationTests.java```



