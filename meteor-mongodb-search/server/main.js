import "/imports/api/dns-hack";
import { Meteor } from "meteor/meteor";
import { initializeListingsAndReviews } from "/imports/api/listingsAndReviews";
import "/imports/api/methods";



Meteor.startup(async () => {
  await initializeListingsAndReviews();
});
