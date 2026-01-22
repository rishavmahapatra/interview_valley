"use client";
import React, { useEffect, useState, useRef } from "react";

export default function page() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null); // sentinel

  const getMovies = async (pageNum = 1) => {
    const res = await fetch(`/api/movies?page=${pageNum}&limit=21`);
    const movies = await res.json();
    setMovies((prev) => [...prev, ...movies]);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          handleLoadMore();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <div>
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

        {/* Sentinel for infinite scroll */}
        <div
          ref={loaderRef}
          className="mt-4 flex mx-auto w-full justify-center items-center"
        >
          <span className="text-gray-500">Loading more...</span>
        </div>
      </div>
    </div>
  );
}
