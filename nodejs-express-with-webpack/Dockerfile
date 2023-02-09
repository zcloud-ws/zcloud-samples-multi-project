FROM node:18 as builder

USER node:node

# Pre cache packages
COPY --chown=node:node package.json /workspace/package.json
COPY --chown=node:node package-lock.json /workspace/package-lock.json

WORKDIR /workspace
RUN npm install

# Copy the go source
COPY --chown=node:node . .


# Build production
RUN npm run build

# Create image from builded source

FROM node:18

USER node:node

WORKDIR /app

COPY --from=builder /workspace/dist /app

ENTRYPOINT ["node", "main.cjs"]
