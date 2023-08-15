export const MB = 1024 * 1024;

export const getRandomInt = (min = 0, max = 255) =>
  Math.floor(Math.random() * max);

const fillString = (size = 1024 * 1024) =>
  [...Array(size).keys()]
    .map(() => String.fromCharCode(getRandomInt(32, 126)))
    .join();

export const printMemoryInfo = () => {
  const { heapTotal, heapUsed, rss } = process.memoryUsage();
  console.log("======");
  console.log(`Memory Used  ${rss / MB}MB `);
  console.log(`Heap Used  ${heapUsed / MB}MB `);
  console.log(`Heap Total ${heapTotal / MB}MB `);
  console.log("======");
};

export const usedHeapMB = () => {
  const { rss } = process.memoryUsage();
  return Math.floor(rss / MB);
};

export const allocateMemory = async ({ allocateMB, timeoutSeconds = 1 }) => {
  printMemoryInfo();
  const strData = [];
  const maxMemory = +allocateMB;
  while (usedHeapMB() < maxMemory) {
    strData.push(fillString(maxMemory));
  }
  printMemoryInfo();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      strData.splice(0, strData.length);
      global.gc();
      printMemoryInfo();
    }, +timeoutSeconds * 1000);
  });
};
