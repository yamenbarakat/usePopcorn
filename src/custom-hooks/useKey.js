import { useEffect } from "react";

export function useKey(type, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code === type) {
        action("");
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [type, action]);
}
