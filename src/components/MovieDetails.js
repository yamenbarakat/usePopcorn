import StarsRating from "./StarsRating";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useKey } from "../custom-hooks/useKey";

const KEY_API = "3b033020";

export default function MovieDetails({
  selectedId,
  onSelectedId,
  onWatchedMovies,
  watchedMovies,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isRated = watchedMovies.find(
    (movie) => movie.imdbID === selectedMovie.imdbID
  );

  const {
    Poster,
    Title,
    Released,
    Runtime,
    Genre,
    imdbRating,
    Plot,
    Actors,
    Director,
    imdbID,
  } = selectedMovie;

  function handleAddMovie(userRating) {
    const newMovie = {
      imdbID,
      Poster,
      Title,
      imdbRating: isNaN(imdbRating) ? imdbRating : Number(imdbRating),
      userRating: Number(userRating),
      Runtime: parseInt(Runtime),
    };

    onWatchedMovies((prev) => [...prev, newMovie]);
    onSelectedId("");
  }

  // fetch the details of the selected movie by using its id
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY_API}&i=${selectedId}`
      );
      const data = await res.json();

      setSelectedMovie(data);
      setIsLoading(false);
    }

    fetchMovie();
  }, [selectedId, setSelectedMovie]);

  // unselect a movie by pressing escape key
  useKey("Escape", onSelectedId);

  // change the title page to the title of selected movie
  useEffect(() => {
    if (Title) {
      document.title = "Movie |" + Title;
    }

    return () => (document.title = "usePopcorn");
  }, [Title]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={() => onSelectedId("")}>
              ←
            </button>
            <img src={Poster} alt={`${Title} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} • {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isRated ? (
                <p>You rated this movie {isRated.userRating} ⭐</p>
              ) : (
                <StarsRating onAddMovie={handleAddMovie} />
              )}
            </div>
            <p>{Plot}</p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </div>
      )}
    </>
  );
}
