import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import NumResults from "./components/NumResults";
import Search from "./components/Search";

import "./index.css";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import Loader from "./components/Loader";
import WatchedMoviesList from "./components/WatchedMoviesList";
import MovieDetails from "./components/MovieDetails";
import Summary from "./components/Summary";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorage } from "./custom-hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [moviesList, isLoading, error] = useMovies(query);
  const [selectedId, setSelectedId] = useState("");
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watched");



  function handleQuery(query) {
    setQuery(query);
  }

  function handleSelectedId(id) {
    setSelectedId(id);
  }

  function handleRemoveMovie(id) {
    setWatchedMovies((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  function ErrorMessage(message) {
    return (
      <p className="error">
        <span>⛔️</span> {message}
      </p>
    );
  }

  useEffect(() => {
    setSelectedId("");
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={handleQuery} />
        <NumResults moviesList={moviesList} />
      </NavBar>

      <Main>
        <Box>
          {error && ErrorMessage(error)}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              moviesList={moviesList}
              onSelectedId={handleSelectedId}
            />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onSelectedId={setSelectedId}
              onWatchedMovies={setWatchedMovies}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <Summary movies={watchedMovies} />
              <WatchedMoviesList
                watchedMovies={watchedMovies}
                onRemoveMovie={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
