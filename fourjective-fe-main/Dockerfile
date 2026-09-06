# ===== Builder =====
FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_BACKEND_URL

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN pnpm build

# ===== Runner =====
FROM node:20-alpine
WORKDIR /app

RUN npm install -g pnpm
ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]