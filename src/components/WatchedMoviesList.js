export default function WatchedMoviesList({ watchedMovies, onRemoveMovie }) {
  return (
    <>
      <ul className="list">
        {watchedMovies?.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.Runtime} min</span>
              </p>

              <button
                className="btn-delete"
                onClick={() => onRemoveMovie(movie.imdbID)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
