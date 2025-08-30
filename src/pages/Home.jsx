import React, { useCallback, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const categories = {
  "Now Playing": "avengers",
  Popular: "batman",
  "Top Rated": "harry potter",
  Upcoming: "spider-man",
};
function MyFilter(movies, conditionFn) {
  const result = [];
  for (let i = 0; i < movies.length; i++) {
    if (conditionFn(movies[i])) result.push(movies[i]);
  }
  return result;
}
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("avengers");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ year: "", genre: "" });
  const [hasMore, setHasMore] = useState(true);
  const fetchMovies = useCallback(async (q, p = 1, year = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=23ce33ec&s=${q}&page=${p}${
          year ? `&y=${year}` : ""
        }`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies((prev) =>
          p === 1 ? data.Search : [...prev, ...data.Search]
        );
        setHasMore(data.Search.length > 0);
      } else {
        if (p === 1) setMovies([]);
        setHasMore(false);
        setError(data.Error || "No movies found");
      }
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    setPage(1);
    fetchMovies(query, 1, filters.year);
  }, [query, filters.year, fetchMovies]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    const throttled = throttle(handleScroll, 300);
    window.addEventListener("scroll", throttled);
    return () => window.removeEventListener("scroll", throttled);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) fetchMovies(query, page, filters.year);
  }, [page, query, filters.year, fetchMovies]);

  // simple throttle
  function throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn(...args);
      }
    };
  }

  const filteredMovies = filters.genre
    ? MyFilter(movies, (m) =>
        m.Type
          ? m.Type.toLowerCase().includes(filters.genre.toLowerCase())
          : true
      )
    : movies;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">🎬 Movie Explorer</h1>
        <SearchBar onSearch={(val) => setQuery(val)} />
        <div className="flex flex-wrap gap-3 justify-center mt-3">
          {Object.entries(categories).map(([label, keyword]) => (
            <button
              key={label}
              onClick={() => setQuery(keyword)}
              className={`px-4 py-2 rounded-xl ${
                query === keyword ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Filters onFilter={(f) => setFilters(f)} />
      </header>

      <main className="px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </main>

      {loading && <p className="text-center p-6">Loading...</p>}
      {error && <p className="text-center text-red-400 p-6">{error}</p>}
    </div>
  );
};

export default Home;
