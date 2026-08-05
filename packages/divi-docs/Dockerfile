FROM node:26-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm i

RUN npm run build:docs:prod

FROM node:26-bookworm-slim AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/divi-docs ./packages/divi-docs

EXPOSE 5175

CMD ["npm", "run", "start:docs:prod"]