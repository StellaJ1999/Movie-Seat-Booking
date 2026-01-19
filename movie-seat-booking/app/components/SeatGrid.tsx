"use client";
import SeatRow from "./SeatRow";

export default function SeatGrid({seats, handleSeatClick}: {seats: Array<{id:number, occupied: boolean, selected: boolean}>, handleSeatClick: (id:number) => void}) { 
    return (
        <div className="seat-grid">
            {Array.from({length: 6}).map((_, rowIndex) =>
            <SeatRow 
                key={rowIndex} //Key för att undvika varningar i konsolen, key används för att identifiera varje rad unikt
                seats={seats.slice(rowIndex * 8, (rowIndex * 8 + 8))} //Dela upp sätena i rader om 8
                handleSeatClick={handleSeatClick}
            />
            )}
        </div>
    )
}