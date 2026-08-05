FROM node:26-bookworm-slim

WORKDIR /app

COPY --chown=$(whoami):$(whoami) package*.json ./
COPY --chown=$(whoami):$(whoami) apps/web/package*.json ./apps/web/ 

RUN npm i --include=dev --ignore-scripts

COPY . .

ENV NODE_ENV=production

RUN npm run build:prod --workspace=@divi/web

# WORKDIR /app/apps/web

EXPOSE 3000