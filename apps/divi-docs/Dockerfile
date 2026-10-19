FROM node:26-bookworm-slim AS builder

WORKDIR /app

COPY --chown=$(whoami):$(whoami) package*.json ./
COPY --chown=$(whoami):$(whoami) package.json package-lock.json ./

RUN npm i --include=dev --ignore-scripts

COPY . .

ENV NODE_ENV=production

RUN npm run build:docs:prod

# WORKDIR /app/apps/divi-docs

EXPOSE 3000