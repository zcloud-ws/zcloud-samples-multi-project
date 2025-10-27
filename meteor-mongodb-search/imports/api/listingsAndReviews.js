import { Mongo } from "meteor/mongo";

export const ListingsAndReviews = new Mongo.Collection("listingsAndReviews");

export const initializeListingsAndReviews = async () => {
  const rawColl = ListingsAndReviews.rawCollection();
  const indexes = (await rawColl.listSearchIndexes()).toArray;
  if (indexes.length > 0) {
    console.log("ListingsAndReviews already initialized", indexes);
    return;
  }
  console.log("Initializing listingsAndReviews");
  rawColl
    .createSearchIndex({
      name: "partial-search",
      definition: {
        mappings: {
          dynamic: false,
          fields: {
            description: [
              {
                type: "autocomplete",
              },
              {
                type: "string",
              },
            ],
          },
        },
      },
    })
    .catch(console.error);
};
