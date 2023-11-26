import { useState } from "react";

export default function StarsRating({ onAddMovie }) {
  const [rating, setRating] = useState("");
  const [tempRating, setTempRating] = useState("");

  const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };
  const textStyle = {
    lineHeight: "1",
    margin: "0px",
    color: "#fcc419",
    fontSize: "16px",
  };

  return (
    <>
      <div style={containerStyle}>
        <div style={{ display: "flex" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <Star
              key={i}
              onRate={() => setRating(i + 1)}
              onHover={() => setTempRating(i + 1)}
              onLeave={() => setTempRating("")}
              full={tempRating ? tempRating > i : rating > i}
            />
          ))}
        </div>
        <p style={textStyle}>{tempRating || rating}</p>
      </div>

      {rating && (
        <button className="btn-add" onClick={() => onAddMovie(rating)}>
          + Add to list
        </button>
      )}
    </>
  );
}

function Star({ onRate, onHover, onLeave, full }) {
  const starStyle = {
    width: "24px",
    height: "24px",
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#fcc419"
          stroke="#fcc419"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fcc419"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
