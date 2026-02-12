// Express server with SSE endpoint, wiring Kafka producer and consumer

import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { createTopics } from './kafka.js';
import { startProducer } from './producer.js';
import { startConsumer } from './consumer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);

const app = express();
const clients = new Set();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// SSE endpoint
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Send initial connection event
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);

  clients.add(res);
  console.log(`SSE client connected (total: ${clients.size})`);

  req.on('close', () => {
    clients.delete(res);
    console.log(`SSE client disconnected (total: ${clients.size})`);
  });
});

function broadcast(message) {
  const payload = `data: ${JSON.stringify(message)}\n\n`;
  for (const client of clients) {
    client.write(payload);
  }
}

async function main() {
  try {
    console.log('Creating Kafka topics...');
    await createTopics();

    console.log('Starting producer...');
    await startProducer();

    console.log('Starting consumer...');
    await startConsumer((message) => {
      broadcast({ type: 'message', ...message });
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

main();
