import express from "express";
import { allocateMemory } from "./utils.js";

const index = express();

const port = process.env.PORT || 3000;

if (process.env.ENABLE_BENCHMARKING) {
  index.get(
    "/benchmarking/memory/:allocateMB/:timeoutSeconds",
    async (req, res) => {
      const { allocateMB = 10, timeoutSeconds = 1 } = req.params;
      console.log(req.path, {
        allocateMB,
        timeoutSeconds,
      });
      await allocateMemory({ allocateMB, timeoutSeconds });
      res.set("Content-type", "application/json");
      res
        .status(200)
        .send(JSON.stringify({ status: { allocateMB, timeoutSeconds } }));
    }
  );
}

index.get("/health", (req, res) => {
  console.log("GET /health");
  res.status(200).send({ status: "ok" });
});

index.get("/internal-error", (req, res) => {
  console.log("GET /internal-error");
  res.status(500).send({ error: "Internal Server Error" });
});

index.get("/not-found", (req, res) => {
  console.log("GET /not-found");
  res.status(404).send({ error: "Not Found" });
});

index.get("/", async (req, res) => {
  console.log("GET /");
  res.set("Content-type", "application/json");
  res.status(200).send(JSON.stringify({ status: "success" }));
});

const server = index.listen(port, () => {
  console.log(`Listen on :${port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
