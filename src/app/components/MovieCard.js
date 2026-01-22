export default function MovieCard({ movie }) {
  return (
    <div className="group relative min-w-45 cursor-pointer">

      {/* Base Poster */}
      <div className="transition-transform duration-300 transform-gpu group-hover:scale-110">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full aspect-2/3 object-cover rounded-md"
        />
      </div>

      {/* Floating Preview Panel */}
      <div
        className="
          absolute -left-8 -top-10 mt-2
          w-75
          opacity-0 group-hover:opacity-100
          pointer-events-none group-hover:pointer-events-auto
          bg-neutral-900/95 backdrop-blur-md
          rounded-lg overflow-hidden shadow-2xl
          transition-all duration-300
          z-20
        "
      >
        {/* Landscape Preview Image */}
        <div className="w-full aspect-video bg-black">
          <img
            src={movie.landscapePoster || movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 text-white space-y-2">
          <h3 className="font-semibold">{movie.title}</h3>
          <p className="text-xs text-neutral-300 line-clamp-3">
            {movie.plot}
          </p>

          <div className="flex gap-2 pt-2">
            <button className="px-3 py-1 bg-white text-black text-xs rounded hover:bg-neutral-200">Play</button>
            <button className="px-3 py-1 border border-neutral-500 text-neutral-200 text-xs rounded">+</button>
            <button className="px-3 py-1 border border-neutral-500 text-neutral-200 text-xs rounded">i</button>
          </div>
        </div>
      </div>
    </div>
  );
}
