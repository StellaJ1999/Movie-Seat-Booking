"use client";
import Seat from "./Seat";

export default function SeatRow({seats, handleSeatClick}: {seats: Array<{id:number, occupied: boolean, selected: boolean}>, handleSeatClick: (id:number) => void}) {
    return (
        <div className="row">
            {seats.map(seat => (
                <Seat 
                    key={seat.id} 
                    occupied={seat.occupied}
                    selected={seat.selected}
                    onSelect={() => handleSeatClick(seat.id)} 
                />
            ))}
        </div>
    )
}