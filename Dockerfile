FROM node:21-slim AS base

FROM base AS builder

WORKDIR /app

ARG DATABASE_URL
ARG DATABASE_AUTH_TOKEN

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG HOST_NAME
ARG APP_NAME
ARG DATABASE_URL
ARG DATABASE_AUTH_TOKEN
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG GOOGLE_API_KEY
ARG EMAIL_SERVER_PASSWORD
ARG EMAIL_FROM
ARG BCC_EMAIL
ARG STRIPE_ESSENTIALS_PRODUCT_ID
ARG STRIPE_PREMIUM_PRODUCT_ID

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ARG HOSTNAME

CMD node server.js
