"use client";

export default function MovieSelector({ movies, selectedMovieId, setSelectedMovieId }) {
  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie: </label>
      <select 
        value={selectedMovieId} 
        onChange={e => setSelectedMovieId(e.target.value)} 
        name="movie" 
        id="movie"
        disabled={movies.length === 0}
      >
        {movies.map(movie => (
          <option key={movie.id} value={movie.id}>
            {movie.Title} ({movie.Year}) — {movie.price} kr
          </option>
        ))}
      </select>
    </div>
  );
}