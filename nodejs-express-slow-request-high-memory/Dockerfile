FROM node:24-alpine AS builder

USER node:node

COPY --chown=node:node package.json /app/package.json
COPY --chown=node:node package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

ENTRYPOINT ["node", "--expose-gc", "--max-old-space-size=768", "src/index.js"]
