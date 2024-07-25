import { Meteor } from "meteor/meteor";

import {
  addRandomJob,
  registerBullBoard,
  workerProcess,
} from "../imports/api/bullmq/server/bullmq";

const userData = {
  username: "zcloud",
  password: "zcloud",
  email: "test@zcloud.ws",
  profile: {
    name: "Test User",
  },
};

Meteor.startup(async () => {
  // Create a new user if none exists
  if ((await Meteor.users.find().countAsync()) === 0) {
    await Accounts.createUserAsync(userData);
  }

  // Register BullBoard
  registerBullBoard();
  // Add a random job
  addRandomJob();
  // Start the worker process
  if (!workerProcess.isRunning()) {
    workerProcess.run().catch((err) => {
      console.log(`Error running worker: ${err}`);
    });
  }
});
