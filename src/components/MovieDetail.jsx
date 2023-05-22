import React from "react";

function MovieDetail({ selectedMovie }) {
  const releaseDate = selectedMovie?.release_date;
  const year = releaseDate?.split("-")[0];


  return (
    <div className="text-white py-1 md:mt-6 w-[18rem] md:w-[40rem] lg:w-[80%] text-justify">
      <h2 className="font-bold text-lg md:text-2xl lg:text-4xl">
        {selectedMovie?.title}
      </h2>
      <div className="text-sm font-semibold md:text-xl lg:text-2xl md:mt-2">
        <span className="mr-2 md:mr-6">{selectedMovie.genres?.[0].name}</span>
        <span>{selectedMovie.genres?.[1].name}</span>
        <h2 className="text-xs mb-3 lg:mb-6 md:mt-2 md:text-lg lg:text-xl">
          {year}
        </h2>
      </div>
      <p className="text-xs leading-relaxed lg:leading-[1.8] md:text-xl lg:text-2xl">
        {selectedMovie?.overview}
      </p>
    </div>
  );
}

export default MovieDetail;
