"use client";
import { useBooking } from "@/lib/useBooking";
import MovieSelector from "./components/MovieSelector";
import SeatLegend from "./components/SeatLegend";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";
import ContinueButton from "./components/ContinueButton";
import BookingModule from "./components/BookingModule";
import WarningMessage from "./components/WarningMessage";

export default function Page() {
  console.log('Page rendering');
  
  const {
    movies,
    seats,
    selectedMovieId,
    setSelectedMovie,
    warningMessage,
    showBookingModule,
    setShowBookingModule,
    handleSeatClick,
    handleContinueClick,
    handleBooking,
    selectedSeatCount,
    totalPrice
  } = useBooking();

  console.log('selectedSeatCount:', selectedSeatCount, 'totalPrice:', totalPrice, 'selectedMovieId:', selectedMovieId);

  return (
    <>
      <MovieSelector
        movies={movies}
        selectedMovieId={selectedMovieId}
        setSelectedMovie={setSelectedMovie}
      />
      <SeatLegend />
      <SeatGrid seats={seats} handleSeatClick={handleSeatClick} />
      <Summary selectedSeatCount={selectedSeatCount ?? 0} totalPrice={totalPrice ?? 0} />
      <WarningMessage warningMessage={warningMessage} />
      <ContinueButton onClick={handleContinueClick} />
      
      {showBookingModule && selectedMovieId != null &&
      <BookingModule 
          movie={movies.find(m => String(m.id) === String(selectedMovieId))!}
        seats={seats}
        onBook={handleBooking}
        onClose={() => setShowBookingModule(false)}
        selectedSeatCount={selectedSeatCount}
        totalPrice={totalPrice}
      />}

    </>
  );
}
