"use client";

interface MovieSelectorProps {
  movies: Array<{id: number, title: string, year: string, price: number}>;
  selectedMovieId: number | null;
  setSelectedMovie: (id: string | number) => void;
}

export default function MovieSelector({ movies, selectedMovieId, setSelectedMovie }: MovieSelectorProps) {
  
  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie: </label>
      <select 
        value={selectedMovieId || ''} 
        onChange={e => setSelectedMovie(Number(e.target.value))} 
        name="movie" 
        id="movie"
      >
        {movies.map((movie: {id: number, title: string, year: string, price: number}) => (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.year}) - {movie.price} kr
            </option>
        ))}
      </select>
    </div>
  );
}