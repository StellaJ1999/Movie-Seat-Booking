const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002';



export interface Movie {
  id: number;
  title: string;
  year: string;
  price: number;
}

export interface Booking {
    id?: number;
    movieId: number;
    seats: number[];
    name: string;
    phone: string;
}

export async function getMovies(): Promise<Movie[]> {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
 

