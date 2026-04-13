import express from "express";
import cowsay from "cowsay";
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

index.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

index.get("/", (req, res) => {
  res.set("Content-type", "text/plain");
  res.status(200).send(cowsay.say({ text: "Hello World" }));
});

index.listen(port, () => {
  console.log(`Listen on :${port}`);
});
