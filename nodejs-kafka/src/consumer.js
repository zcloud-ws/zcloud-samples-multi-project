// Kafka consumer that subscribes to all topics and emits messages via callback

import { kafka, TOPICS } from './kafka.js';

export async function startConsumer(onMessage) {
  const consumer = kafka.consumer({ groupId: 'nodejs-kafka-demo-group' });
  await consumer.connect();

  for (const topic of TOPICS) {
    await consumer.subscribe({ topic, fromBeginning: false });
  }

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      const data = JSON.parse(value);
      onMessage({ topic, partition, offset: message.offset, data, timestamp: Date.now() });
    },
  });

  console.log(`Consumer subscribed to: ${TOPICS.join(', ')}`);
  return consumer;
}
