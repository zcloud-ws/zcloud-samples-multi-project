# Meteor Project with BullMQ

This is a simple Meteor project that demonstrates how to use BullMQ with Meteor.

Requirements:

- Node.js
- Meteor
- Redis

## Start redis server

```shell
docker run --rm -p 6379:6379 redis
```

## Environment variables

- `REDIS_HOST`: Redis host (default: `localhost`)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password (default: '')
- `REDIS_USER`: Redis user (default: `default`)
- `REDIS_DB`: Redis database (default: 0)

## Env to Copy/Paste on zCloud

```dotenv
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=""
REDIS_USER=default
REDIS_DB=0
```

## Start project

1. Run `meteor npm install`
2. Run `meteor npm start`

## User/Password

- User: `zcloud`
- Password: `zcloud`

## Explanation

### Starttup

[server/main.js](server/main.js)

- Register BullMQ Dashboard;
- Create queue;
- Add jobs;
- Start worker;

[bullmq.js](imports/api/bullmq/server/bullmq.js)

- Redir connecton
- Queue definition;
- Add jobs definition;
- Worker definition;
- Register BullMQ Dashboard definition;
- Handler authentication to secure dashboard;

[client/main.jsx](client/main.jsx)

- Configure login/logout handlers to set/unset cookies with meteor user token;
