import express from "express";

const index = express();

const port = process.env.PORT || 3000;

index.get("/", (req, res) => {
  res.set("Content-type", "application/json");
  res.status(200).send(JSON.stringify({ status: "success" }));
});

index.listen(port, () => {
  console.log(`Listen on :${port}`);
});
