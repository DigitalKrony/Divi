FROM node:26-bookworm-slim AS builder

WORKDIR /app

COPY --chown=$(whoami):$(whoami) package*.json ./
COPY --chown=$(whoami):$(whoami) apps/divi-docs/package*.json ./apps/divi-docs/

RUN npm i --include=dev --ignore-scripts

COPY . .

ENV NODE_ENV=production

RUN npm run build:docs:prod

EXPOSE 3000