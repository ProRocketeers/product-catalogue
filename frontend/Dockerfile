FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

ARG PUBLIC_API_URL=https://labs-api.rock8cloud.cz
ENV PUBLIC_API_URL=${PUBLIC_API_URL}

RUN pnpm build

FROM node:lts-alpine AS runner

ARG PORT=4173

WORKDIR /app

COPY --from=builder /app/ ./

RUN addgroup -S app && adduser -S app -G app \
	&& chown -R app:app /app

USER app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port ${PORT}"]
