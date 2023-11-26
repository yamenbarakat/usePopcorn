export default function NumResults({ moviesList }) {
  return (
    <p className="num-results">
      Found <strong>{moviesList.length}</strong> results
    </p>
  );
}
