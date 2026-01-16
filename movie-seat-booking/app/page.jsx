"use client";
import { useState, useEffect } from "react";
import MovieSelector from "./components/MovieSelector";
import SeatLegend from "./components/SeatLegend";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";
import BookButton from "./components/BookButton";

export default function Page() {
  // Hardcodad data, ersätt med api-anrop i useEffect
  const movies = [
    {id: "1", "Title": "Fast and Furious 6", "Year": "2013", "price": 100},
    {id: "2", "Title": "The Dark Knight", "Year": "2008", "price": 120},
    {id: "3", "Title": "Inception", "Year": "2010", "price": 150},
    {id: "4", "Title": "Interstellar", "Year": "2014", "price": 130}
  ];
  
  const [selectedMovieId, setSelectedMovieId] = useState("");

  // useEffect(() => {[]}, []);

  return (
    <>
      <MovieSelector movies={movies} selectedMovieId={selectedMovieId} setSelectedMovieId={setSelectedMovieId} />
      <SeatLegend />
      <SeatGrid />
      <Summary />
      <BookButton />
    </>
  );
}