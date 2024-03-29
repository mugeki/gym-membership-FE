FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16-alpine as builder
ARG NEXT_PUBLIC_YOUTUBE_API_KEY
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_BE_API_URL
ARG NEXT_PUBLIC_DEFAULT_PROFILE

ENV NEXT_PUBLIC_YOUTUBE_API_KEY=$NEXT_PUBLIC_YOUTUBE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_BE_API_URL=$NEXT_PUBLIC_BE_API_URL
ENV NEXT_PUBLIC_DEFAULT_PROFILE=$NEXT_PUBLIC_DEFAULT_PROFILE

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ARG NODE_ENV=production
RUN echo ${NODE_ENV}
RUN NODE_ENV=${NODE_ENV} npm run build

FROM node:16-alpine as runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 80
CMD ["npm", "start"]