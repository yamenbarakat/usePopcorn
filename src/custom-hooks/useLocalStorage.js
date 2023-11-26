import { useEffect, useState } from "react";

export function useLocalStorage(initalState, key) {
  const [value, setValue] = useState(function () {
    const storage = localStorage.getItem(key);

    return storage ? JSON.parse(storage) : initalState;
  });

  // store watchedMovies data in local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
