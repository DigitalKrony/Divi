FROM node:26-bookworm-slim

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

WORKDIR /app/apps/web

EXPOSE 3000