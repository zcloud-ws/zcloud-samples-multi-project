FROM eclipse-temurin:19 as builder

COPY . /workspace

WORKDIR /workspace

RUN ./mvnw clean package

FROM eclipse-temurin:19

WORKDIR /app

COPY --from=builder /workspace/target/java-springboot-*.jar /app/java-springboot.jar

ENTRYPOINT ["java", "jar", "java-springboot.jar"]
