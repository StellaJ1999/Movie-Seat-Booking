"use client";
import WarningMessage from './warningMessage';
import React from 'react';
import { useState } from 'react';

// Interface för typning av props som skickas in till BookingModule 
// komponenten från page.tsx
interface BookingModuleProps {
  movie: { id?: string | number; title?: string; price?: number } | null;
  seats?: Array<{ id?: string | number; selected: boolean }>;
  onBook?: (payload: { name: string; phone: string; movieId: string | number; seatIds: Array<string | number> }) => void;
  onClose?: () => void;
}

export default function BookingModule({ movie , seats = [], onBook, onClose }: BookingModuleProps) {
    
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  
  const selectedCount = seats.filter((seat) => seat.selected).length;
  const title = movie?.title || "Select a movie";
  const price = movie?.price ?? 0; // Defaultvärde 0 om price är undefined
  const total = selectedCount * price; 

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
              movieId: movie.id ?? "",
              seatIds: seats.filter(seat => seat.selected).map(seat => seat.id ?? "")
          });
    }

  return (
    <div className="booking-overlay">
      <div className="booking-module">
        <div className="booking-module__header">
          <div>
            <h2>Book your tickets</h2>
            <h3>{title}</h3>
          </div>
        </div>
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
          <div className="booking-module__stat"><span>Seats</span><strong>{selectedCount}</strong></div>
          <div className="booking-module__stat"><span>Price</span><strong>{price} kr</strong></div>
          <div className="booking-module__stat"><span>Total</span><strong>{total} kr</strong></div>
        </div>

        <button
          id="book-button"
          type="button"
          onClick={handleBookClick}
          disabled={!selectedCount || !movie}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
