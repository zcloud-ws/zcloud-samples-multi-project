import express from "express";
import { registerMetrics } from "./metrics.js";

const app = express();

const port = process.env.PORT || 3000;

registerMetrics({
  app,
  path: "/metrics",
  useAuth: process.env.USE_METRICS_AUTH,
});

app.get("/", (req, res) => {
  res.set("Content-type", "application/json");
  res.status(200).send(JSON.stringify({ status: "success" }));
});

let count = 0;

const fibonacci = num => {
  if (num <= 1) {
    if (count++ % 100 === 0) {
      console.log(`fibonacci temp ${num}`);
      count = 0;
    }
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

app.get("/load-fibonacci", (req, res) => {
  res.set("Content-type", "application/json");
  const { num } = req.query;
  const start = new Date();
  console.log(`fibonacci ${num}`);
  const fib = fibonacci(num);
  const message = `fibonacci ${num}=${fib}, ${new Date() - start}ms`;
  console.log(message);
  res.status(200).send(JSON.stringify({ status: "success", message }));
});

app.listen(port, () => {
  console.log(`Listen on :${port}`);
});
