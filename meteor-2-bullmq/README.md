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

- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port
- `REDIS_PASSWORD`: Redis password
- `REDIS_USER`: Redis user

## Start project

1. Run `meteor npm install`
2. Run `meteor npm start`
