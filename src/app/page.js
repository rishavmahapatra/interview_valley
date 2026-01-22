"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard"

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = async (pageNum = 1) => {
    const res = await fetch(`/api/movies?page=${pageNum}&limit=21`);
    const data = await res.json();
    setMovies(prev => [...prev, ...data]);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const handleLoadMore = () => setPage(prev => prev + 1);

  return (
    <div>
    <div className="mt-18 min-h-screen p-6 ml-28 overflow-x-auto flex gap-4 items-start ">
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
      
      <button
        onClick={handleLoadMore}
        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Load More
      </button>
    </div>
    </div>
  );
}
