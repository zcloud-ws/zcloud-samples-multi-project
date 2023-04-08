import express from "express";
import pg from 'pg';

const {Client} = pg;
import * as dotenv from 'dotenv';

dotenv.config()

const index = express();

const port = process.env.PORT || 3000;

index.get("/", async (req, res) => {
  try {
    const client = new Client()
    await client.connect()

    const result = await client.query('SELECT $1::text as message', ['Hello world from PostgreSQL!'])
    const message = result.rows[0].message;
    await client.end()
    res.set("Content-type", "application/json");
    res.status(200).send(JSON.stringify({status: "success", message}));
  } catch (err) {
    console.log(err)
    res.set("Content-type", "application/json");
    res.status(500).send(JSON.stringify({
      status: "error",
      message: err.message
    }));
  }
});

index.listen(port, () => {
  console.log(`Listen on :${port}`);
});
