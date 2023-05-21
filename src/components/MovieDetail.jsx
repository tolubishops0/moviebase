import React from "react";

function MovieDetail({ selectedMovie, playTrailer }) {
  const releaseDate = selectedMovie?.release_date;
  const year = releaseDate?.split("-")[0];

  if (playTrailer) {
    return null; 
  }

  return (
    <div className="text-white py-2">
      <h2 className="font-bold text-lg md:text-2xl">{selectedMovie?.title}</h2>
      <div className="text-sm font-semibold md:text-xl">
        <span className="mr-2">{selectedMovie.genres?.[0].name}</span>
        <span className="mr-2">{selectedMovie.genres?.[1].name}</span>
        <h2 className="text-xs mb-3 md:text-lg">{year}</h2>
      </div>
      <p className="text-xs leading-relaxed md:text-xl">
        {selectedMovie?.overview}
      </p>
    </div>
  );
}

export default MovieDetail;
