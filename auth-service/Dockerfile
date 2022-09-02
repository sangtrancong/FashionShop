FROM openjdk:10-jre-slim

WORKDIR /app

COPY ./target/*.jar /app/app.jar

EXPOSE 9999

CMD ["java", "-jar", "app.jar"]