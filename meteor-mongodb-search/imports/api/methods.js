import { Meteor } from "meteor/meteor";
import { ListingsAndReviews } from "./listingsAndReviews";

Meteor.methods({
  async "listings.search"(text) {
    // If no search text, return all listings (limited)
    if (!text || text.trim() === "") {
      const rows = await ListingsAndReviews.rawCollection()
        .aggregate([
          { $limit: 20 },
          {
            $addFields: {
              score: 0,
              highlights: [],
            },
          },
        ])
        .toArray();
      return rows;
    }

    // Perform search with MongoDB Atlas Search
    const rows = await ListingsAndReviews.rawCollection()
      .aggregate([
        {
          $search: {
            index: "partial-search",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: text,
                    path: "description",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                    },
                    tokenOrder: "sequential",
                  },
                },
                {
                  text: {
                    query: text,
                    path: ["description"],
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                    },
                  },
                },
              ],
            },
            highlight: {
              path: ["description"],
              maxCharsToExamine: 100000,
              maxNumPassages: 3,
            },
          },
        },
        {
          $addFields: {
            score: { $meta: "searchScore" },
            highlights: { $meta: "searchHighlights" },
          },
        },
        { $sort: { score: -1 } },
        { $limit: 20 },
      ])
      .toArray();

    return rows;
  },
});
