# syntax=docker/dockerfile:1.7

# Base
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

WORKDIR /app

# Prune Workspace#####
FROM base AS pruner

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo prune api --docker

# Install
FROM base AS installer

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .
COPY --from=pruner /app/out/pnpm-workspace.yaml .

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm --filter @repo/db db:generate

RUN pnpm exec turbo run build

# Production API########
FROM installer AS deploy

RUN pnpm deploy --filter api --prod /prod

# Runtime #####
FROM node:22-alpine AS runner

RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nodejs && \
    adduser -S nodejs -G nodejs

COPY --from=deploy --chown=nodejs:nodejs /prod .

USER nodejs

EXPOSE 4000

CMD ["node","dist/index.js"]