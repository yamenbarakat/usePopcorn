export default function MoviesList({ moviesList, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {moviesList?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectedId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} movie`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
