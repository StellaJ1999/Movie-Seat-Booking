"use client";

export default function MovieSelector({ movies, selectedMovieId, setSelectedMovieId }: { movies: {id: string, Title: string, Year: string, price: number}[], selectedMovieId: string, setSelectedMovieId: (id: string) => void }) {
  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie: </label>
      <select 
        value={selectedMovieId} 
        onChange={e => setSelectedMovieId(e.target.value)} 
        name="movie" 
        id="movie"
      >
        {movies.map((movie: {id: string, Title: string, Year: string, price: number}) => (
            <option key = {movie.id} value={movie.id}>
                {movie.Title} ({movie.Year}) - {movie.price} kr
            </option>
        ))}
      </select>
    </div>
  );
}