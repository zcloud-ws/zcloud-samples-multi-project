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

index.get("/internal-error", (req, res) => {
  res.status(500).send({ error: "Internal Server Error" });
});

index.get("/not-found", (req, res) => {
  res.status(404).send({ error: "Not Found" });
});

index.get("/", async (req, res) => {
  // Allocate ~20MB of memory, 1MB at a time with 1s delay between each
  const memoryHog = [];
  for (let i = 0; i < 20; i++) {
    memoryHog.push(Buffer.alloc(1024 * 1024, "x")); // 1MB each
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1s delay
  }

  res.set("Content-type", "application/json");
  res.status(200).send(JSON.stringify({ status: "success", memoryAllocated: "20MB", delay: "20s" }));
});

index.listen(port, () => {
  console.log(`Listen on :${port}`);
});
