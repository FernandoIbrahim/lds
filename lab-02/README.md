# Sistema de Aluguel de Carros
O sistema permite o cadastro tanto de clientes quanto de agentes, onde ambos podem registrar seus veículos para serem alugados por outros clientes. Dessa forma, os locadores, sejam clientes ou agentes, têm a opção de aceitar ou recusar os pedidos de aluguel feitos no sistema, promovendo uma interação flexível e dinâmica entre as partes envolvidas.

## Integrantes
* Fernando Antônio Ferreira Ibrahim
* Gabriel Pongelupe de Carvalho
* Jhonata Silveira Dias

## Orientadores
* Cleiton Silva Tavares

## Instruções de utilização
Inicialização do Projeto

Para iniciar o projeto de maneira eficiente e portátil, utilizamos o Docker Compose. Certifique-se de que o Docker esteja instalado na sua máquina local antes de prosseguir.

Comandos para Execução do banco de dados:

Iniciar Use o comando abaixo para construir e iniciar o containers:
```
docker-compose up --build
```
Finalizar a Execução Para parar e remover os containers, use:
```
docker-compose down
```

Assim rodamos uma imagem mariadb:latest, assim implementado o banco de dados relacional Mariadb junto com seu entrypoint.
Observa-se que a porta 3306 da sua máquina local precisa estar livre para o correto funcionamento do containe
