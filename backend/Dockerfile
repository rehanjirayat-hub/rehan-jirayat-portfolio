# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build (skip tests — they need a DB)
COPY src ./src
RUN mvn clean package -DskipTests -B

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR
COPY --from=build /app/target/portfolio-api-0.1.0-SNAPSHOT.jar app.jar

# Render Free has 512 MB RAM; tune JVM accordingly
ENV JAVA_OPTS="-Xms256m -Xmx512m"

EXPOSE 8080

# Render sets the PORT env var; fall back to 8080 for local Docker runs
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar --server.port=${PORT:-8080}"]
