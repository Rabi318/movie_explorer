import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBar = ({ onSearch }) => {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 500);

  // Trigger search only when debounced value changes
  useEffect(() => {
    if (debounced) {
      onSearch(debounced);
    }
  }, [debounced, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full md:w-96 p-3 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
};

export default SearchBar;
