import { useEffect, useState } from "react";

const KEY_API = "3b033020";

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  // fetch movies list based on query search
  useEffect(() => {
    if (query.length < 3) {
      setMoviesList([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY_API}&s=${query}`,
          {
            signal: controller.signal,
          }
        );

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMoviesList(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return [moviesList, isLoading, error];
}
