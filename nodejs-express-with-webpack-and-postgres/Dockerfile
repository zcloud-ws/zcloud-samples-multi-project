FROM node:24-alpine AS builder

USER node:node

COPY --chown=node:node package.json /workspace/package.json
COPY --chown=node:node package-lock.json /workspace/package-lock.json

WORKDIR /workspace
RUN npm install

COPY --chown=node:node . .

RUN npm run build

FROM node:24-alpine

USER node:node

WORKDIR /app

COPY --from=builder /workspace/dist /app

EXPOSE 3000

ENTRYPOINT ["node", "main.cjs"]
