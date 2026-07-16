FROM node:22-alpine

WORKDIR /app

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=api

EXPOSE 4000

CMD ["node", "apps/api/dist/index.js"]