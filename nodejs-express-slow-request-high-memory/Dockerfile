FROM node:18 as builder

USER node:node

# Pre cache packages
COPY --chown=node:node package.json /app/package.json
COPY --chown=node:node package-lock.json /app/package-lock.json

WORKDIR /app

RUN npm install

# Copy the go source
COPY --chown=node:node . .

ENTRYPOINT ["npm", "run", "start"]
