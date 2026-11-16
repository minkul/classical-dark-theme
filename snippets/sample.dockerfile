# syntax=docker/dockerfile:1
# Sample Dockerfile covering language tokens.

ARG NODE_VERSION=20

# ── Build stage ──
FROM node:${NODE_VERSION}-alpine AS builder

LABEL maintainer="author@example.com" \
      version="1.0.0" \
      description="Sample image"

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev && \
    npm cache clean --force

COPY . .
RUN npm run build

# ── Runtime stage ──
FROM node:${NODE_VERSION}-alpine AS runtime

RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
ADD https://example.com/config.tar.gz /tmp/

USER app
EXPOSE 3000/tcp
VOLUME ["/app/data"]

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

SHELL ["/bin/sh", "-c"]
STOPSIGNAL SIGTERM
ONBUILD RUN echo "Building from base"

ENTRYPOINT ["node"]
CMD ["dist/server.js", "--port", "3000"]
