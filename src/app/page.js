"use client";
import React, { useEffect,useState } from "react";

export default function page() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const getMovies = async (pageNum = 1) => {
    const res = await fetch(`/api/movies?page=${pageNum}&limit=21`)
    const movies = await res.json();
     setMovies(prev => [...prev, ...movies]);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <a
        className="bg-blue-500 rounded p-2"
        href={`/api/download/696ec0db740876007820d083`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Resume
      </a>
      <div className="mt-8 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="border rounded p-4 my-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-32 h-48 rounded mb-2"
              />
            )}
            <p>{movie.plot}</p>
          </div>
        ))}
        <div className="mt-4 flex mx-auto w-full justify-center items-center">
        
      </div>
      <div className="mt-4 p-2 flex mx-auto w-full justify-center items-center">
<button 
          onClick={handleLoadMore}
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Load More
        </button>
        </div>
      </div>
    </div>
  );
}
