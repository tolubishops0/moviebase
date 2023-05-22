import React from "react";

function MovieTrailer({
  playTrailer,
  setPlayTrailer,
  selectedMovie,
  renderTrailer,
}) {
  const handleCloseTrailer = () => {
    setPlayTrailer(false);
  };

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
  };

  return (
    <div className="mt-4">
      {playTrailer && (
        <button
          className="z-20 absolute right-2 bottom-2 flex justify-end bg-[#201e20] bg-opacity-70 border-[#f4f4f4] border-[1px] py-1 md:py-2 px-2 md:px-4 lg:px-6 lg:py-3 font-medium text-[#f4f4f4]"
          onClick={handleCloseTrailer}
        >
          Close Trailer
        </button>
      )}
      {selectedMovie?.videos && playTrailer && renderTrailer()}
      {!playTrailer && (
        <button
          className="bg-[#201e20] bg-opacity-70 border-[#f4f4f4] border-[1px] py-1 md:py-2 px-2 md:px-4 lg:px-6 lg:py-3 font-medium text-[#f4f4f4]"
          onClick={handlePlayTrailer}
        >
          Play Trailer
        </button>
      )}
    </div>
  );
}

export default MovieTrailer;
