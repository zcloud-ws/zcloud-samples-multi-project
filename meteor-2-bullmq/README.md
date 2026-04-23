# Meteor Project with BullMQ

This is a simple Meteor project that demonstrates how to use BullMQ with Meteor.

## Requirements

- Node.js
- Meteor
- Redis

## Start Redis Server

```shell
docker run --rm -p 6379:6379 redis
```

## Environment Variables

- `REDIS_HOST`: Redis host (default: `localhost`)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password (default: '')
- `REDIS_USER`: Redis user (default: `default`)
- `REDIS_DB`: Redis database (default: 0)
- `REDIS_TLS`: Enable TLS connection when set to `true` (default: `false`)
- `REDIS_CA_FILE`: Path to a PEM file with the CA certificate used to validate the Redis server (optional; only used when `REDIS_TLS=true`)
- `REDIS_CA_BASE64`: Base64-encoded PEM CA certificate, as an alternative to `REDIS_CA_FILE` for environments where mounting a file is inconvenient (optional)

## Env to Copy/Paste on zCloud

```dotenv
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=""
REDIS_USER=default
REDIS_DB=0
REDIS_TLS=false
REDIS_CA_FILE=
REDIS_CA_BASE64=
```

## Start Project

1. Run `meteor npm install`
2. Run `meteor npm start`

## User/Password

- User: `zcloud`
- Password: `zcloud`

## Explanation

### Startup

`server/main.js`

- Register BullMQ Dashboard
- Create queue
- Add jobs
- Start worker

`imports/api/bullmq/server/bullmq.js`

- Redis connection
- Queue definition
- Add jobs definition
- Worker definition
- Register BullMQ Dashboard definition
- Handler authentication to secure dashboard

`client/main.jsx`

- Configure login/logout handlers to set/unset cookies with Meteor user token
```
