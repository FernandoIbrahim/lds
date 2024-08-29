# Use a imagem base do OpenJDK 17
FROM openjdk:17-jdk-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o Maven Wrapper, .mvn/ e o pom.xml para o container
COPY .mvn/ .mvn/
COPY mvnw .
COPY pom.xml .

# Copie o código-fonte para o container
COPY src/ src/

# Garanta que o Maven Wrapper tenha permissão de execução
RUN chmod +x ./mvnw

# Instale as dependências e compile a aplicação sem rodar os testes
RUN ./mvnw package -DskipTests

# Comando para rodar a aplicação Spring Boot
CMD ["./mvnw", "spring-boot:run"]

# Exponha a porta que a aplicação irá usar
EXPOSE 8080
