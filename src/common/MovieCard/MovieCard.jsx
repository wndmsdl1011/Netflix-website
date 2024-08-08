import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom"; // 과제1

const MovieCard = ({ movie }) => {
  const navigate = useNavigate(); // 과제1
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const handleCardClick = () => {
    // 과제1
    navigate(`/movies/${movie.id}`); // 과제1
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={handleCardClick} // 과제1
    >
      <div className="overlay">
        <h2 className="movie-title">{movie.title}</h2>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger" className="movie-id-badge" key={id}>
            {id}
          </Badge>
        ))}
        <div className="bottom-area">
          <div>
            <img
              src="https://noona-netflix-react-query.vercel.app/IMDB.png"
              width={25}
              className="movie-vote-img"
              alt="IMDB"
            />
            {movie.vote_average}
          </div>
          <div>
            <img
              src="https://noona-netflix-react-query.vercel.app/people4.png"
              width={25}
              className="movie-popularity-img"
              alt="Popularity"
            />
            {movie.popularity}
          </div>
          <div>{movie.adult ? "Over 18" : "Under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
