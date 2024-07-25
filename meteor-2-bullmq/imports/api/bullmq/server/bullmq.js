import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import cookieParser from "cookie-parser";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue, Worker } from "bullmq";

const bullmqUIPath = "/bullmq/ui";
const queueName = "simpleQueue";

const redisConnection = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  user: process.env.REDIS_USER || "default",
  password: process.env.REDIS_PASSWORD || "",
};

const simulateLongProcess = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const simpleQueue = new Queue(queueName, {
  connection: redisConnection,
});

export const workerProcess = new Worker(
  queueName,
  async (job) => {
    console.log(`Processing job ${job.id} with data: `, job.data);
    const ms = Math.floor(Math.random() * 10000);
    await simulateLongProcess(ms);
    return ms;
  },
  {
    connection: redisConnection,
  },
);

export const addRandomJob = () => {
  simpleQueue
    .add("simpleJob", { date: Date.now().toLocaleString() })
    .then(() => {
      const random = Math.floor(Math.random() * 10000);
      console.log(`Next job in ${random}ms`);
      Meteor.setTimeout(addRandomJob, random);
    })
    .catch((err) => {
      console.log(`Error adding job: ${err}`);
    });
};

export const checkLoggedUser = async (req) => {
  const token = req.cookies["Meteor.loginToken"];
  if (!token) {
    return false;
  }
  const hashedToken = Accounts._hashLoginToken(token);
  const user = await Meteor.users.findOneAsync(
    {
      "services.resume.loginTokens.hashedToken": hashedToken,
    },
    { projection: { _id: 1 } },
  );
  return !!user?._id;
};

export const registerBullBoard = () => {
  console.log(`Register BullMQ Board...`);
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(bullmqUIPath);
  createBullBoard({
    queues: [new BullMQAdapter(simpleQueue)],
    serverAdapter,
  });
  WebApp.connectHandlers.use(bullmqUIPath, cookieParser());
  WebApp.connectHandlers.use(
    bullmqUIPath,
    Meteor.bindEnvironment((req, res, next) =>
      checkLoggedUser(req, res, next)
        .then((logged) => {
          if (logged) {
            next();
          } else {
            res.writeHead(401);
            res.end("Unauthorized");
          }
        })
        .catch((err) => {
          console.log(`Error checking user: ${err}`);
          res.writeHead(401);
          res.end("Unauthorized");
        }),
    ),
  );
  WebApp.connectHandlers.use(bullmqUIPath, serverAdapter.getRouter());
};
