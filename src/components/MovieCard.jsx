import React from "react";

function MovieCard({ movies, selectMovie }) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  return (
    <div className="mt-5 lg:mt-10 overflow-x-auto pl-2">
      <div className="flex flex-nowrap">
        {movies?.map((movie) => {
          if (!movie.backdrop_path) {
            return null;
          }
          return (
            <div
              key={movie.id}
              className="px-2 flex-shrink-0 cursor-pointer object-cover transition-transform duration-300 transform hover:scale-110"
              onClick={() => selectMovie(movie)}
            >
              {movie.poster_path && (
                <img
                  className="w-40 h-50 md:w-52 md:h-72 lg:h-80 lg:w-60 object-cover"
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
