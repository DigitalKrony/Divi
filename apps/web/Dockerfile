FROM node:26-bookworm-slim

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/ 

RUN npm install --include=dev --ignore-scripts

COPY . .

RUN npm run build:prod --workspace=@divi/web

ENV NODE_ENV=production

WORKDIR /app/apps/web

EXPOSE 3000