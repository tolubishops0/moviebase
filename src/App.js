import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import "./index.css";
import Youtube from "react-youtube";
import { useDetectAdBlock } from "adblock-detect-react";

function App() {
  

  const [movies, setMovies] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);

  const imagePath = "http://image.tmdb.org/t/p/w500";
  const apiUrl = "http://api.themoviedb.org/3/";
  const key = "4a76764757632a034cd9bf6c1355df72";

  const getmovies = async (searchkey) => {
    const type = searchkey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${apiUrl}/${type}/movie`, {
      params: {
        api_key: key,
        query: searchkey,
      },
    });
    await selectMovie(results[0]);
    setMovies(results);
  };

  const getmovie = async (id) => {
    const { data } = await axios.get(`${apiUrl}/movie/${id}`, {
      params: {
        api_key: key,
        append_to_response: "videos",
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const movieData = await getmovie(movie.id);
    setSelectedMovie(movieData);
  };
const adBlockDetected = useDetectAdBlock();
  useEffect(() => {
    getmovies();
    if (adBlockDetected) {
      window.alert("ad block detected");
    }
    window.alert("no block detected");
  }, []);

  const searchMovies = (event) => {
    event.preventDefault();
    setSearchkey(event.target.value);
    getmovies(searchkey);
  };

  const renderTrailer = () => {
    const trailer = selectedMovie?.videos.results.find(
      (vid) => vid.site === "YouTube"
    );

    return trailer ? (
      <Youtube
        videoId={trailer?.id}
        containerClassName="youtube-container"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
            origin: "https://localhost:3000",
          },
        }}
      />
    ) : null;
  };

  return (
    <div>
      <h1>welcome</h1>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          onChange={(event) => setSearchkey(event.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div
        style={{
          backgroundImage: `url(${imagePath}${selectedMovie?.backdrop_path})`,
        }}
      >
        {playTrailer ? (
          <button
            onClick={() => {
              setPlayTrailer(false);
            }}
          >
            close
          </button>
        ) : null}
        {selectedMovie?.videos && playTrailer ? renderTrailer() : null}
        {playTrailer ? null : (
          <button
            onClick={() => {
              setPlayTrailer(true);
              console.log("clicked", selectedMovie.title);
            }}
          >
            play trailer
          </button>
        )}
        <h2>{selectedMovie.title}</h2>
        <p>{selectedMovie.overview ? selectedMovie.overview : null}</p>
      </div>
      {movies?.map((movie) => {
        return (
          <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
        );
      })}
    </div>
  );
}

export default App;
