import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import "react-multi-carousel/lib/styles.css";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

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
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
