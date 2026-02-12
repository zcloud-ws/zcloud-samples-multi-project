// Interval-based Kafka message publisher

import { kafka, TOPICS } from './kafka.js';
import { generators } from './generators.js';

const INTERVAL = parseInt(process.env.PRODUCE_INTERVAL_MS || '3000', 10);

export async function startProducer() {
  const producer = kafka.producer();
  await producer.connect();
  console.log('Producer connected');

  setInterval(async () => {
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const data = generators[topic]();

    try {
      await producer.send({
        topic,
        messages: [{ value: JSON.stringify(data) }],
      });
      console.log(`Produced to ${topic}: ${JSON.stringify(data)}`);
    } catch (err) {
      console.error(`Failed to produce to ${topic}:`, err.message);
    }
  }, INTERVAL);

  return producer;
}
