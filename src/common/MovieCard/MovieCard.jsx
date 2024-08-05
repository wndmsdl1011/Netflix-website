import React from "react";
import Badge from 'react-bootstrap/Badge';
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {

  const {data:genreData} = useMovieGenreQuery()
  const showGenre=(genreIdList)=>{
    if(!genreData) return []
    const genreNameList = genreIdList.map((id)=>{
      const genreObj = genreData.find((genre)=>genre.id === id)
      return genreObj.name;
    })

    return genreNameList

  }

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h2 className="movie-title">{movie.title}</h2>
        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger" className="movie-id-badge">{id}</Badge>
        ))}
        <div className="bottom-area">
            <div><img src="https://noona-netflix-react-query.vercel.app/IMDB.png" width={25} className="movie-vote-img"></img>{movie.vote_average}</div>
            <div><img src="https://noona-netflix-react-query.vercel.app/people4.png" width={25} className="movie-popularity-img"></img>{movie.popularity}</div>
            <div>{movie.adult?'Over 18':"Under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
