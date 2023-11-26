import { useEffect, useRef } from "react";

export default function Search({ query, onSetQuery }) {
  const searchEl = useRef(null);

  useEffect(() => {
    searchEl.current.focus();
  }, []);

  return (
    <input
      ref={searchEl}
      type="text"
      placeholder="Search movies..."
      className="search"
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}
