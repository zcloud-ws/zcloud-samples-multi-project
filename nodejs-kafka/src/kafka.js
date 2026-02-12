// KafkaJS client setup and topic configuration

import { Kafka } from 'kafkajs';

const BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
const KAFKA_USERNAME = process.env.KAFKA_USERNAME;
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD;
const KAFKA_MECHANISM = process.env.KAFKA_MECHANISM || 'scram-sha-256';

export const TOPICS = ['orders', 'notifications', 'logs'];

const kafkaConfig = {
  clientId: 'nodejs-kafka-demo',
  brokers: [BROKER],
  retry: {
    initialRetryTime: 1000,
    retries: 10,
  },
};

if (KAFKA_USERNAME && KAFKA_PASSWORD) {
  kafkaConfig.sasl = {
    mechanism: KAFKA_MECHANISM,
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
  };
  kafkaConfig.ssl = {
    rejectUnauthorized: false,
  };
}

export const kafka = new Kafka(kafkaConfig);

export async function createTopics() {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    waitForLeaders: true,
    topics: TOPICS.map((topic) => ({
      topic,
      numPartitions: 1,
      replicationFactor: 1,
    })),
  });
  await admin.disconnect();
  console.log(`Topics created: ${TOPICS.join(', ')}`);
}
