FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

EXPOSE 5173

FROM base AS development


CMD ["npm", "run", "dev"]

FROM base AS build

#RUN npm run build

FROM base AS production

RUN npm install --only=production

CMD ["npm", "run", "start"]