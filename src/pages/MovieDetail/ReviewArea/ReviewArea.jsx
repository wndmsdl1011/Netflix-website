import React from "react";
import { useMovieReviewsQuery } from "../../../hooks/useMovieReview";
import "./ReviewArea.style.css";
import Alert from "react-bootstrap/Alert";

const ReviewArea = ({ movie_id }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(movie_id);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  if (!data || !data.results || data.results.length === 0) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <h1>Reviews</h1>
      {data?.results.map((review, index) => {
        return (
          <div className="review-box m-2 mb-3" key={index}>
            <span className="author-name">{review.author}</span>
            <span>
              rating:{review.author_details.rating}
              <img width="20px" className="push-up" />
            </span>
            <div>{review.content}</div>
            <h6>{review.updated_at}</h6>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewArea;
