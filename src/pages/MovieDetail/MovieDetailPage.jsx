import React from "react";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import Alert from "react-bootstrap/Alert";
import { Container, Row, Col } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import RecommendMovieSlide from "../Homepage/components/RecommendMovieSlide/RecommendMovieSlide";
import ReviewSection from "./ReviewArea/ReviewArea";

const fetchMovieDetail = async (id) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

const formatNumber = (num) => {
  return num.toLocaleString(); // Formats number with commas
};

const MovieDetailPage = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetail(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <Alert variant="danger">
        Failed to fetch movie details: {error.message}
      </Alert>
    );
  }

  if (!movie || !movie.poster_path) {
    return <div>No movie data available</div>;
  }

  return (
    <Container>
      <Row>
        <Col
          xs={6}
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
            width: "300px",
            height: "450px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Col>
        <Col>
          <div className="detail-area">
            <div className="genre-section">
              {movie.genres.map((genre, index) => (
                <Badge bg="danger" className="movie-id-badge" key={index}>
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h1 className="title-area">{movie.title}</h1>
            <h3 className="tagline-area">{movie.tagline}</h3>

            <h6 className="vote-area">
              <img
                src="https://noona-netflix-react-query.vercel.app/IMDB.png"
                width={25}
                className="movie-vote-img"
                alt="vote_average"
              />
              {movie.vote_average}
              <img
                src="https://noona-netflix-react-query.vercel.app/people4.png"
                width={25}
                className="movie-popularity-img"
                alt="Popularity"
                style={{ marginLeft: "15px" }}
              />
              {movie.popularity}
            </h6>
            <h6 className="overview-area">{movie.overview}</h6>
            <div className="badge-area">
              <div>
                <Badge bg="danger" style={{ marginRight: "15px" }}>Budget</Badge>
                $ {formatNumber(movie.budget)}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "15px" }}>Revenue</Badge>
                $ {formatNumber(movie.revenue)}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "15px" }}>Release Date</Badge>
                {movie.release_date}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "15px" }}>Run Time</Badge>
                {movie.runtime}분
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <RecommendMovieSlide movie_id={id}/>
      <ReviewSection movie_id={id}/>
    </Container>
    
  );
};

export default MovieDetailPage;
