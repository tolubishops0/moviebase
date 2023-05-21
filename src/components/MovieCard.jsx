import React from "react";

function MovieCard({ movies, selectMovie }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex flex-nowrap">
        {movies?.map((movie) => {
          if (!movie.backdrop_path) {
            return null;
          }
          return (
            <div
              key={movie.id}
              className="px-2 flex-shrink-0"
              onClick={() => selectMovie(movie)}
            >
              {movie.poster_path && (
                <img
                  className="w-52 h-72 object-cover"
                  src={`${imagePath}${movie.poster_path}`}
                  alt="movieposter"
                />
              )}
              <p className="text-center mt-2 text-xs font-bold w-[90%] md:text-lg">
                {movie.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieCard;
