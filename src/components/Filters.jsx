import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const applyFilter = () => {
    onFilter({ year, genre });
  };
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center my-4">
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-28 p-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="w-36 p-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
      />

      <button
        onClick={applyFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default Filters;
