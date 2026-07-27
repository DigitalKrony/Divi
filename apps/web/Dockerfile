FROM node:26-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ic

COPY . .

WORKDIR /app/apps/web

EXPOSE 3000