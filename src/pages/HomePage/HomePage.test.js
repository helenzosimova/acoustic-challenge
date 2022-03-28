import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import { API_URL, ARTICLE_URL } from "../../api";
import HomePage from "./index";

beforeAll(() => {
  jest.spyOn(axios, "get").mockImplementation();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockResponse = {
  data: {
    elements: {
      heading: {
        value: "Top article title",
      },
      author: {
        value: "",
      },
      body: {
        values: [
          '<h2><span style="font-family:&#39;arial&#39; , &#39;helvetica&#39; , sans-serif">Hey there</span></h2>\n',
          "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n",
        ],
      },
      date: {
        value: "2020-09-06T22:00:00Z",
      },
      mainImage: {
        value: {
          leadImage: {
            url: "/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg",
          },
          leadImageCaption: {
            value: "Listen your voice",
          },
        },
      },
    },
  },
};

describe("HomePage", () => {
  it("fetch article data from API and check data", async () => {
    axios.get.mockResolvedValue(mockResponse);
    const res = await axios.get(`${API_URL}${ARTICLE_URL}`);
    expect(res).toEqual(mockResponse);

    const { findByText, getByRole, getByTestId } = render(<HomePage />);

    const headingItem = await findByText(/Top article title/i);
    expect(headingItem).toBeInTheDocument();

    const image = getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      `${API_URL}/859f2008-a40a-4b92-afd0-24bb44d10124/dxresources/0874/0874022e-89fe-448e-af2f-d7a88b7baa04.jpg`
    );
    expect(image).toHaveAttribute("alt", "Listen your voice");

    expect(getByTestId("author-item")).toBeInTheDocument();
    expect(getByTestId("date-time")).toBeInTheDocument();
    expect(getByTestId("article-text-0")).toBeInTheDocument();
    expect(getByTestId("article-text-1")).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${API_URL}${ARTICLE_URL}`);
  });
});
