"use client";
import WarningMessage from './WarningMessage';
import React from 'react';
import { useState } from 'react';

// Interface för typning av props som skickas in till BookingModule 
// komponenten från page.tsx
interface BookingModuleProps {
  movie: { id?: number; title?: string; price?: number } | null;
  seats?: Array<{ id?: number; selected: boolean }>;
  onBook?: (payload: { name: string; phone: string; movieId: number; seats: number[] }) => void;
  onClose?: () => void;
  selectedSeatCount?: number;
  totalPrice?: number;
}

export default function BookingModule({ movie , seats = [], onBook, onClose, selectedSeatCount, totalPrice }: BookingModuleProps) {
    
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  function handleBookClick() {

    if (!name.trim() || !phone.trim()) {
      setWarningMessage("Please fill in all required fields.");
      return;
    }
    if (!movie) {
      setWarningMessage("Movie not found.");
      return;
    } 
    setWarningMessage("");
    onBook?.({
      name,
      phone,
      movieId: movie.id ?? 0,
      seats: seats.filter(seat => seat.selected).map(seat => seat.id ?? 0)
    });

  }

  return (
    <div className="booking-overlay">
      <div className="booking-module">
        <div className="booking-module__header">
          <div>
            <h2>Book your tickets</h2>
            <h3>{movie?.title || "Unknown Movie"}</h3>
          </div>
        </div>
        {/* Stänger modulen om onClose skickats in från parent */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="booking-module__close"
            >
              ×
            </button>
        )}

        <label htmlFor="name">Name</label>
        <input 
         value={name}
         onChange={(e) => setName(e.target.value)}
          type="text" 
          id="name" 
          name="name" 
          placeholder="Full name" 
        />

        <label htmlFor="telephone">Telephone</label>
        <input 
         value={phone}
         onChange={(e) => setPhone(e.target.value)}
         type="tel" id="telephone"
         name="telephone" 
         placeholder="+46 ..." 
        />
        <WarningMessage warningMessage={warningMessage} />
        
        <div className="booking-module__stats">
          <div className="booking-module__stat"><span>Seats</span><strong>{selectedSeatCount}</strong></div>
          <div className="booking-module__stat"><span>Price</span><strong>{movie?.price} kr</strong></div>
          <div className="booking-module__stat"><span>Total</span><strong>{totalPrice} kr</strong></div>
        </div>

        <button
          id="book-button"
          type="button"
          onClick={handleBookClick}
          disabled={!selectedSeatCount || !movie}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
