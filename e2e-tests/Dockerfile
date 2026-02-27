FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Copy pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:resolve

# Copy source code
COPY src ./src
COPY testng.xml .

# Run tests
CMD ["mvn", "test", "-DsuiteXmlFile=testng.xml"]
