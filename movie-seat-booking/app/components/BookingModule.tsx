"use client";

export default function BookingModule(movie: {id: number, title: string, price: number}) {
    return (
        <div>
            <h2>Book your tickets</h2>
            <h3>{movie.title}</h3>
            <label htmlFor="">Name</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="">Email</label>
            <input type="email" id="email" name="email" />
            <button id="book-button">Book Now</button>
        </div>
    )
}