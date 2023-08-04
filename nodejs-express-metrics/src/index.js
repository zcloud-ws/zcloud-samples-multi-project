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

app.listen(port, () => {
  console.log(`Listen on :${port}`);
});
