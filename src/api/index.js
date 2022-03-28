import axios from "axios";

export const API_URL =
  process.env.API_URL || "https://content-eu-4.content-cms.com";
export const ARTICLE_URL =
  process.env.ARTICLE_URL ||
  "/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/db4930e9-7504-4d9d-ae6c-33facca754d1";

export const getArticle = () => {
  return axios({
    method: "get",
    url: `${API_URL}${ARTICLE_URL}`,
  }).then(({ data }) => {
    const isDataPresent =
      data?.elements && Object.keys(data.elements).length !== 0;
    if (isDataPresent) {
      return data.elements;
    } else {
      throw new Error("no data");
    }
  });
};
