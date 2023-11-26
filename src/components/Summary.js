export default function Summary({ movies }) {
  const moviesLength = movies.length;
  const averageRating = averageNumImdb("imdbRating");
  const averageUserRating = averageNum("userRating");
  const averageRuntime = averageNum("Runtime");

  function averageNumImdb(type) {
    return movies
      .filter((movie) => typeof movie[type] !== "string")
      .reduce((acc, movie, i, arr) => {
        if (i === arr.length - 1) {
          return (acc + movie[type]) / arr.length;
        }

        return acc + movie[type];
      }, 0);
  }

  function averageNum(type) {
    return movies.reduce((acc, movie) => acc + movie[type], 0) / moviesLength;
  }
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{moviesLength} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{moviesLength ? averageRating.toFixed(2) : "0.00"}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{moviesLength ? averageUserRating.toFixed(2) : "0.00"}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{moviesLength ? averageRuntime.toFixed(2) : "0"} min</span>
        </p>
      </div>
    </div>
  );
}
