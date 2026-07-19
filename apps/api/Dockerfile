# syntax=docker/dockerfile:1.7

# Base
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# Prune Workspace
FROM base AS pruner

RUN pnpm add -g turbo

COPY . .

RUN turbo prune api --docker

# Install Dependencies
FROM base AS installer

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml .
COPY --from=pruner /app/out/pnpm-workspace.yaml .
COPY --from=pruner /app/out/package.json .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

# Generate Prisma Client
RUN pnpm --filter=@repo/db db:generate

# Build Workspace
RUN pnpm exec turbo run build
# Deploy Production Package
RUN pnpm deploy --filter=api --prod /prod

# Runtime Image
FROM node:22-alpine AS runner
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production

WORKDIR /app

RUN addgroup -S nodejs && \
    adduser -S nodejs -G nodejs

COPY --from=installer --chown=nodejs:nodejs /prod/ ./
USER nodejs
EXPOSE 4000

CMD ["pnpm", "start"]