FROM eclipse-temurin:21-jdk AS builder

COPY . /workspace

WORKDIR /workspace

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /workspace/target/java-springboot-*.jar /app/java-springboot.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar java-springboot.jar"]
