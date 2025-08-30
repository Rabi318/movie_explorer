import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.Title}
        </h3>
        <p className="text-gray-400">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
