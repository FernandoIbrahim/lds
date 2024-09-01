# Inicialização do Projeto

Para iniciar o projeto de maneira eficiente e portátil, utilizamos o Docker Compose. Certifique-se de que o Docker esteja instalado na sua máquina local antes de prosseguir.


## Comandos para Execução do banco de dados:
- **Iniciar**
Use o comando abaixo para construir e iniciar o containers:
```
docker-compose up --build
```

- **Finalizar a Execução**
Para parar e remover os containers, use:
```
docker-compose down
```


- **bc-mariadb-school-management-system**
- É o responsável por rodar uma imagem mariadb:latest, assim implementado o banco de dados relacional Mariadb junto com seu entrypoint.
- Observa-se que a porta 3306 da sua máquina local precisa estar livre para o correto funcionamento do container.

## Execução da Aplicação 

Para executar a aplicação, é necessário que você faça a instalação do Java Development Kit (JDK) e do Maven e execute a aplicação através da IDE de sua preferência.

# Testes

## Conexão
O teste de conexão entre o Spring e o Banco de dados pode ser realizada da seguinte forma:

Inicialize o banco de dados através do seguinte comando:

```
docker-compose up mariadb --build
```

Execute separadamente o teste **testDatabaseConnection** presente no diretório 

```
/app/SchoolManagementSystem/src/test/java/com/example/SchoolManagementSystem/SchoolManagementSystemApplicationTests.java
```



