FROM node:18-alpine AS builder

WORKDIR /api

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /api

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /api/dist ./dist

EXPOSE 3000

CMD ["node", "dist/app.js"]