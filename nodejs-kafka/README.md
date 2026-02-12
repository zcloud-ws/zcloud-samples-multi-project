# Node.js Kafka Demo

Real-time dashboard application that demonstrates Apache Kafka message streaming with Node.js using KafkaJS, Express, and Server-Sent Events (SSE).

## Architecture

```
┌─────────────┐    ┌───────────┐    ┌─────────────┐    ┌───────────────┐
│  Generators  │───>│  Producer  │───>│    Kafka     │───>│   Consumer    │
│ (fake data)  │    │            │    │   Broker     │    │               │
└─────────────┘    └───────────┘    └───────────┘    └──────┬────────┘
                                                            │
                                                            │ SSE
                                                            v
                                                     ┌───────────────┐
                                                     │   Dashboard   │
                                                     │  (browser)    │
                                                     └───────────────┘
```

1. **Generators** create random simulated data (orders, notifications, logs)
2. **Producer** publishes messages to three Kafka topics every 3 seconds
3. **Consumer** reads messages from Kafka and forwards them to the Express server
4. **Express server** broadcasts messages to connected browsers via SSE
5. **Dashboard** displays messages in real-time across three columns

## About the displayed data

All data shown in the dashboard is **simulated and fictitious**. The generators produce random data to demonstrate the Kafka messaging flow:

- **Orders** — Random products (GPU, Monitor, Mouse, etc.) with random prices, quantities, and statuses
- **Notifications** — Random types (Info, Warning, Error, Success) with messages like "SSL certificate expiring soon" or "User login detected"
- **Logs** — Random levels (DEBUG, INFO, WARN, ERROR) from fictitious services (auth-service, api-gateway, payment-service, etc.)

**None of the errors, warnings, or log messages represent real issues.** They are generated purely for demonstration purposes.

## Prerequisites

- Node.js >= 24
- A Kafka broker (local or remote)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Edit `.env` with your Kafka broker settings:

```env
PORT=3000
KAFKA_BROKER=localhost:9092
PRODUCE_INTERVAL_MS=3000
KAFKA_USERNAME=
KAFKA_PASSWORD=
KAFKA_MECHANISM=scram-sha-256
```

When `KAFKA_USERNAME` and `KAFKA_PASSWORD` are set, SASL authentication and SSL are enabled automatically. Leave them empty for unauthenticated local connections.

## Running

```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

Open http://localhost:3000 in your browser to view the dashboard.

## Running with Docker Compose

This starts both Kafka (KRaft mode, no Zookeeper) and the application:

```bash
docker compose up --build
```

## Kafka Topics

| Topic           | Description                      |
|-----------------|----------------------------------|
| `orders`        | Simulated e-commerce orders      |
| `notifications` | Simulated system notifications   |
| `logs`          | Simulated application logs       |

## Environment Variables

| Variable             | Default          | Description                          |
|----------------------|------------------|--------------------------------------|
| `PORT`               | `3000`           | Express server port                  |
| `KAFKA_BROKER`       | `localhost:9092` | Kafka broker address                 |
| `PRODUCE_INTERVAL_MS`| `3000`           | Interval between produced messages   |
| `KAFKA_USERNAME`     | —                | SASL username (optional)             |
| `KAFKA_PASSWORD`     | —                | SASL password (optional)             |
| `KAFKA_MECHANISM`    | `scram-sha-256`  | SASL mechanism (`scram-sha-256`, `scram-sha-512`, `plain`) |
