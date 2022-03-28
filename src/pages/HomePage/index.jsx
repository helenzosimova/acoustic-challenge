import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import DOMPurify from "dompurify";
import { API_URL, getArticle } from "../../api";

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const sanitizeData = (htmlItem) => ({
    __html: DOMPurify.sanitize(htmlItem),
  });

  useEffect(() => {
    getArticle()
      .then((elements) => setData(elements))
      .catch((err) => {
        console.log("Error", err.message);
        setError(true);
      });
  }, []);

  // show error
  if (error)
    return (
      <main className="container">
        <div className="error spacing">
          <h1>Opps!</h1>
          <p>Something went wrong</p>
        </div>
      </main>
    );

  return (
    <main className="container">
      <article className="article spacing">
        {data?.heading?.value && (
          <h1 className="article__heading">{data.heading.value}</h1>
        )}
        <div className="article__details">
          {data?.date?.value && (
            <Moment
              data-testid="date-time"
              format="DD/MM/YYYY"
              date={data.date.value}
            />
          )}
          <span className="article__spacer"> | </span>
          {data?.author?.value && (
            <p data-testid="author-item">{data.author.value}</p>
          )}
        </div>
        <div className="article__image-wrapper">
          {data?.mainImage?.value?.leadImage?.url && (
            <img
              className="article__image"
              src={`${API_URL}${data.mainImage.value.leadImage.url}`}
              alt={data?.mainImage?.value?.leadImageCaption?.value}
            />
          )}
        </div>
        <div className="inner-container">
          {Array.isArray(data?.body?.values)
            ? data?.body?.values.map((item, i) => (
                <div
                  data-testid={`article-text-${i}`}
                  key={i}
                  dangerouslySetInnerHTML={sanitizeData(item)}
                />
              ))
            : null}
        </div>
      </article>
    </main>
  );
};

export default HomePage;
