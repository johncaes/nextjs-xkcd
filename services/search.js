const algoliasearch = require("algoliasearch");

const APP_ID = process.env.APP_ID;
const API_KEY = process.env.API_KEY;

const client = algoliasearch("MQFRYWNICC", "b041c9e1e8beb4877c004328c6b3f73a");
const index = client.initIndex("prod_comics");

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return CACHE[query];
  const { hits } = await index.search(query, {
    attributesToRetrieve: ["id", "title", "img", "alt"],
    hitsPerPage: 10,
  });

  CACHE[query];

  return { results: hits };
};
