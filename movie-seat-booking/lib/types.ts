
export interface Seat {
  id: number;
  occupied: boolean;
  selected: boolean;
}

export interface Movie {
  id: number;
  title: string;
  year: string;
  price: number;
}

//json-server skapar ett unikt id automatiskt vid POST, så id är optional här
export interface Booking {
    id?: string;
    movieId: number;
    seats: number[];
    name: string;
    phone: string;
}