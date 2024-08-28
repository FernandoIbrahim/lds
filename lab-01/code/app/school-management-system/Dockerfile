FROM eclipse-temurin:21

RUN mkdir /opt/app
COPY mvnw pom.xml ./

COPY src ./src
 
CMD ["./mvnw", "spring-boot:run"]
