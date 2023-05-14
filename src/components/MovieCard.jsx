import React from "react";

function MovieCard({ movie, selectMovie }) {
  const imagePath = "https://image.tmdb.org/t/p/w500";

  return (
    <div onClick={() => selectMovie(movie)}>
      {movie.poster_path ? (
        <img src={`${imagePath}${movie.poster_path}`} alt="movieposter" />
      ) : null}
      {movie.title}
    </div>
  );
}

export default MovieCard;
