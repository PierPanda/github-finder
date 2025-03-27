import { ghtoken } from "../server/env";

export const ghrequest = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${ghtoken}`,
    },
  });
  return response.json();
};
