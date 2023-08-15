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

index.get("/", (req, res) => {
  res.set("Content-type", "application/json");
  res.status(200).send(JSON.stringify({ status: "success" }));
});

index.listen(port, () => {
  console.log(`Listen on :${port}`);
});
