FROM node:22-alpine AS builder

RUN corepack enable pnpm

COPY package.json pnpm*.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:22-alpine AS runner

RUN corepack enable pnpm

WORKDIR /app

COPY --from=builder package.json pnpm*.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]