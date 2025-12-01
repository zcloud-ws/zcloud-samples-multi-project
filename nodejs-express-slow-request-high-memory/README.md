# Node.js Express - Slow Request & High Memory

A sample Express.js application designed for testing slow requests and high memory usage scenarios. Useful for benchmarking, load testing, and testing container/orchestration behavior under resource pressure.

## Requirements

- Node.js (ES modules support)
- npm

## Installation

```bash
npm install
```

## Running the Application

### Development mode (with 256MB memory limit)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The server listens on port `3000` by default, or the port specified in the `PORT` environment variable.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port to listen on | `3000` |
| `ENABLE_BENCHMARKING` | Enables the `/benchmarking/memory` endpoint | Not set |

## Endpoints

### `GET /`

Simulates a slow request with high memory allocation.

- Allocates ~20MB of memory (1MB at a time)
- Takes ~20 seconds to complete (1 second delay between each allocation)
- Returns: `{ status: "success", memoryAllocated: "20MB", delay: "20s" }`

### `GET /health`

Health check endpoint.

- Returns: `{ status: "ok" }` with status `200`

### `GET /internal-error`

Simulates an internal server error.

- Returns: `{ error: "Internal Server Error" }` with status `500`

### `GET /not-found`

Simulates a not found error.

- Returns: `{ error: "Not Found" }` with status `404`

### `GET /benchmarking/memory/:allocateMB/:timeoutSeconds`

Custom memory allocation endpoint for benchmarking. Only available when `ENABLE_BENCHMARKING` environment variable is set.

- `:allocateMB` - Amount of memory to allocate in MB
- `:timeoutSeconds` - Duration to hold the memory before releasing
- Returns: `{ status: { allocateMB, timeoutSeconds } }`

Example:
```bash
ENABLE_BENCHMARKING=1 npm start
curl http://localhost:3000/benchmarking/memory/50/5
```

## Graceful Shutdown

The application handles `SIGTERM` signals for graceful shutdown, allowing in-flight requests to complete before exiting.
