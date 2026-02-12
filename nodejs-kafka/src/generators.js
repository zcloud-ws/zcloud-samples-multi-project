// Random data generators for each Kafka topic

const products = [
  'Laptop', 'Keyboard', 'Mouse', 'Monitor', 'Headphones',
  'Webcam', 'USB Hub', 'SSD Drive', 'RAM Module', 'GPU',
];

const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const notificationTypes = ['info', 'warning', 'error', 'success'];

const notificationMessages = [
  'User login detected',
  'Payment processed successfully',
  'Inventory low for product',
  'New user registration',
  'Server CPU usage above 80%',
  'Database backup completed',
  'API rate limit approaching',
  'Deployment finished',
  'Cache cleared',
  'SSL certificate expiring soon',
];

const logLevels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

const logServices = ['auth-service', 'api-gateway', 'payment-service', 'user-service', 'inventory-service'];

const logMessages = [
  'Request processed in {ms}ms',
  'Connection pool size: {n}',
  'Cache hit ratio: {pct}%',
  'Retry attempt {n} of 3',
  'Health check passed',
  'Garbage collection took {ms}ms',
  'Queue depth: {n} messages',
  'Rate limiter: {n} requests/sec',
  'Memory usage: {pct}%',
  'Latency p99: {ms}ms',
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateOrder() {
  return {
    orderId: `ORD-${Date.now()}-${randomInt(100, 999)}`,
    product: randomItem(products),
    quantity: randomInt(1, 10),
    price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
    status: randomItem(statuses),
    customer: `customer-${randomInt(1000, 9999)}`,
  };
}

export function generateNotification() {
  return {
    id: `NTF-${Date.now()}-${randomInt(100, 999)}`,
    type: randomItem(notificationTypes),
    message: randomItem(notificationMessages),
    source: randomItem(logServices),
    read: false,
  };
}

export function generateLog() {
  const msg = randomItem(logMessages)
    .replace('{ms}', String(randomInt(1, 500)))
    .replace('{n}', String(randomInt(1, 100)))
    .replace('{pct}', String(randomInt(10, 99)));

  return {
    level: randomItem(logLevels),
    service: randomItem(logServices),
    message: msg,
    traceId: `trace-${randomInt(100000, 999999)}`,
  };
}

export const generators = {
  orders: generateOrder,
  notifications: generateNotification,
  logs: generateLog,
};
