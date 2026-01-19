"use client";
import { useState } from "react";
import MovieSelector from "./components/MovieSelector";
import SeatLegend from "./components/SeatLegend";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";
import ContinueButton from "./components/ContinueButton";

export default function Page() {
  // Hårdkodad data, ersätt med api-anrop i useEffect
  const movies = [
    {id: "1", "Title": "Fast and Furious 6", "Year": "2013", "price": 100},
    {id: "2", "Title": "The Dark Knight", "Year": "2008", "price": 120},
    {id: "3", "Title": "Inception", "Year": "2010", "price": 150},
    {id: "4", "Title": "Interstellar", "Year": "2014", "price": 130}
  ];
  
  const [selectedMovieId, setSelectedMovieId] = useState();


  // useEffect(() => {[]}, []);

  // Skapa en array med 48 stolar för att ge varje stol ett unikt id och status
  const [seats, setSeats] = useState(
    Array.from({ length: 48 }, (_, i) => ({
      id: i,
      occupied: false,
      selected: false
    }))
  );

  function handleSeatClick(seatId){
    const newSeats = [...seats]; // ... operatorn skapar en kopia av arrayen, react behöver en ny array för att kunna upptäcka ändringar
    const seatIndex = newSeats.find(s => s.id === seatId); //hitta rätt stol som matchar id
    seatIndex.selected = !seatIndex.selected; //true blir false och tvärtom
    setSeats(newSeats); //uppdatera state med nya arrayen
  }

  return (
    <>
      <MovieSelector movies={movies} selectedMovieId={selectedMovieId} setSelectedMovieId={setSelectedMovieId} />
      <SeatLegend />
      <SeatGrid seats={seats} handleSeatClick={handleSeatClick} />
      <Summary />
      <ContinueButton />
    </>
  );
}