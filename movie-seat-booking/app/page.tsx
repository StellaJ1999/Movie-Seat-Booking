"use client";
import { useState, useEffect } from "react";
import MovieSelector from "./components/MovieSelector";
import SeatLegend from "./components/SeatLegend";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";
import ContinueButton from "./components/ContinueButton";
import BookingModule from "./components/BookingModule";
import WarningMessage from "./components/warningMessage";

interface Movie {
  id: string;
  Title: string;
  Year: string;
  price: number;
}

interface Seat {
  id: number;
  occupied: boolean;
  selected: boolean;
}

export default function Page() {
  
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showBookingModule, setShowBookingModule] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");


  // Skapa en array med 48 stolar för att ge varje stol ett unikt id och status
  const [seats, setSeats] = useState<Seat[]>(
    Array.from({ length: 48 }, (_, i) => ({
      id: i,
      occupied: false,
      selected: false
    }))
  );

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetch('http://localhost:3002/movies');
      const data = await res.json();
      setMovies(data);
    }
    getMovies();
  }, []);

 function handleBooking(payload: { name: string; phone: string; movieId: string | number; seatIds: Array<string | number> }) {
  const formattedPayload = {
    ...payload,
    seatIds: payload.seatIds.map(id => typeof id === 'string' ? parseInt(id) : id)
  };

  fetch('http://localhost:3002/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedPayload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        payload.seatIds.includes(seat.id)
          ? { ...seat, occupied: true, selected: false }
          : seat
      )
    );
    setShowBookingModule(false);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function handleSeatClick(seatId: number) {
  const newSeats = [...seats]; // ... operatorn skapar en kopia av arrayen, react behöver en ny array för att kunna upptäcka ändringar
  const seatIndex = newSeats.find(s => s.id === seatId); //hitta rätt stol som matchar id
    if (seatIndex) {
      seatIndex.selected = !seatIndex.selected; //true blir false och tvärtom
    }
    setSeats(newSeats); //uppdatera state med nya arrayen
  }

  function handleContinueClick() {
    const selectedCount = seats.filter(seat => seat.selected).length;

    if (!selectedMovieId) {
      setWarningMessage("Please select a movie first.");
      setShowBookingModule(false);
      return;
    }
    if (selectedCount === 0) {
      setWarningMessage("You must select at least one seat to continue.");
      setShowBookingModule(false);
    } else {
      setWarningMessage("");
      setShowBookingModule(true);
    }
  }

  return (
    <>
      <MovieSelector movies={movies} setSelectedMovieId={setSelectedMovieId} selectedMovieId={selectedMovieId} />
      <SeatLegend />
      <SeatGrid seats={seats} handleSeatClick={handleSeatClick} />
      <Summary />
      <WarningMessage warningMessage={warningMessage} />
      <ContinueButton
        onClick={handleContinueClick}
      />
      {showBookingModule && selectedMovieId &&
      <BookingModule 
        movie={movies.find(m => m.id === selectedMovieId)!}
        seats={seats}
        onBook={handleBooking}
        onClose={() => setShowBookingModule(false)}
      />}
    </>
  );
}