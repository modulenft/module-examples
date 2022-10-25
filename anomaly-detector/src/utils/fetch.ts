import nodeFetch from "node-fetch";
import "dotenv/config";
export const fetch = (url: string) => {
  const options = {
    headers: {
      "content-type": "application/json",
      "X-API-KEY": process.env.API_KEY,
    },
    method: "GET",
  };
  return nodeFetch(url, options);
};
