FROM node:26-bookworm-slim

WORKDIR /app

COPY --chown=$(whoami):$(whoami) package*.json ./
COPY --chown=$(whoami):$(whoami) . .

RUN npm i --include=dev --ignore-scripts

COPY . .

ENV NODE_ENV=production

RUN npm run build:docs --workspace=@divi/docs

# WORKDIR /app/packages/divi-docs

EXPOSE 3001