"use client";
import React, { useEffect } from 'react'

export default function page() {

  const [movies, setMovies] = React.useState([]);
  const getMovies = async () => {
    const res = await fetch('/api/movies');
    const movies = await res.json();
    setMovies(movies);
  }

  useEffect(() => {
    getMovies();
  }, []);

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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="border rounded p-4 my-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            {movie.poster && (
              <img src={movie.poster} alt={movie.title} className="w-32 h-48 rounded mb-2" />
            )}
            <p >{movie.plot}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


