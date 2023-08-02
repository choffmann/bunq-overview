FROM node:20-alpine as frontend
RUN mkdir /frontend
COPY ./frontend /frontend/.
WORKDIR /frontend

RUN corepack enable
RUN yarn install
RUN yarn build

FROM gradle:7-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
COPY --from=frontend /frontend/dist /home/gradle/src/main/resources/dist
RUN gradle buildFatJar --no-daemon

FROM openjdk:17
EXPOSE 8080
RUN mkdir /app
COPY --from=build /home/gradle/src/backend/build/libs/*.jar /app/bunq-overview.jar
ENTRYPOINT ["java", "-jar", "/app/bunq-overview.jar"]