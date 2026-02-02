import { Movie, Booking } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getMovies(): Promise<Movie[]> {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function getMovie(id: number): Promise<Movie> {
    const response = await fetch(`${BASE_URL}/movies/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function createMovie(payload: Movie): Promise<Movie> {
    const response = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function updateMovie(id: number, payload: Movie) : Promise<Movie> {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function deleteMovie(id: number) : Promise<void> {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }  
}

export async function getBookings(): Promise<Booking[]> {
    const response = await fetch(`${BASE_URL}/bookings`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function createBooking(payload: Booking): Promise<Booking> {
    const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


