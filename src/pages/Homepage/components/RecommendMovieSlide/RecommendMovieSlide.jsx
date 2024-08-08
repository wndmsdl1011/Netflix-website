import React from "react";
import { useRecommendMoviesQuery } from "../../../../hooks/useRecommendMovies";
import "react-multi-carousel/lib/styles.css";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const RecommendMovieSlide = ({movie_id}) => {
  const { data, isLoading, isError, error } = useRecommendMoviesQuery(movie_id);

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
      <MovieSlider
        title="Related Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendMovieSlide;
