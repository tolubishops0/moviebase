import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import "./index.css";
import Youtube from "react-youtube";
import SearchInput from "./components/SearchInput";
import MovieTrailer from "./MovieTrailer";
import MovieDetail from "./components/MovieDetail";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const imagePath = "https://image.tmdb.org/t/p/w500";
  const apiUrl = "https://api.themoviedb.org/3/";
  const key = "4a76764757632a034cd9bf6c1355df72";

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  useEffect(() => {
    getmovies();
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
        videoId={trailer.key}
        className="youtube-container"
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
    ) : null;
  };

  return (
    <div className={`${isDarkMode ? "dark-mode" : "light-mode"} py-2`}>
      <div className="toggle-icon-container md:pr-6 lg:pr-12">
        <ion-icon name="toggle" onClick={toggleMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </ion-icon>
      </div>
      <SearchInput
        isDarkMode={isDarkMode}
        searchMovies={searchMovies}
        setSearchkey={setSearchkey}
      />
      <div
        className="hero flex flex-col gap-y-[0.2rem] md:gap-y-2 justify-center pl-3 md:pl-6 lg:pl-12 mt-3 h-[18rem] bg-no-repeat bg-cover md:h-[22rem] lg:h-[30rem]"
        style={{
          backgroundImage: selectedMovie.backdrop_path
            ? `url(${imagePath}${selectedMovie.backdrop_path})`
            : null,
        }}
      >
        <MovieTrailer
          renderTrailer={renderTrailer}
          selectedMovie={selectedMovie}
          playTrailer={playTrailer}
          setPlayTrailer={setPlayTrailer}
        />
        <MovieDetail selectedMovie={selectedMovie} playTrailer={playTrailer} />
      </div>
      <MovieCard selectMovie={selectMovie} movies={movies} />
    </div>
  );
}

export default App;
