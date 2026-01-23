import {useState, useEffect, useMemo} from 'react';
import { getMovies, getBookings, createBooking, Movie, Booking } from "./api";

export interface Seat {
  id: number;
  occupied: boolean;
  selected: boolean;
}

export function useBooking() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [warningMessage, setWarningMessage] = useState<string>("");
    const [showBookingModule, setShowBookingModule] = useState<boolean>(false);

    // skapar initialt en array med 48 stolar för att ge varje stol
    // ett unikt id och status (ej upptagen, ej vald). Detta representerar salongens säten.
    const [seats, setSeats] = useState<Seat[]>(
        Array.from({ length: 48 }, (_, i) => ({
        id: i,
        occupied: false,
        selected: false
        }))
    );


    
    // Ladda filmer och bokningar från API vid komponentens mount. (mount = första renderingen)
    useEffect(() => {
    Promise.all([getMovies(), getBookings()])

        .then(([moviesData, bookingsData]) => {
            setMovies(moviesData);
            setBookings(bookingsData);

            if (moviesData.length > 0) {
                setSelectedMovieId(moviesData[0].id);
            }
        })
        .catch((err) => {
        setWarningMessage(err.message);
        });
    }, []);

    // Beräkna upptagna säten för vald film (derived state)
    const occupiedSeatIds = useMemo(() => {
    if (!selectedMovieId) return new Set();
    return new Set(
        bookings
            .filter(booking => String(booking.movieId) === String(selectedMovieId))
            .flatMap(booking => booking.seats)
    );
    }, [bookings, selectedMovieId]);

  // Seats som skickas till UI: occupied härleds, selected nollställs om sätet är upptaget
  const seatsView: Seat[] = useMemo(
    () =>
      seats.map((s) => ({
        ...s,
        occupied: occupiedSeatIds.has(s.id),
        selected: occupiedSeatIds.has(s.id) ? false : s.selected,
      })),
    [seats, occupiedSeatIds]
  );

    
    const setSelectedMovie = (id: string | number) => {
        const numId = Number(id);
        setSelectedMovieId(numId);
        setSeats(prevSeats => prevSeats.map(seat => ({ ...seat, selected: false })));
    };

    const selectedMovie = selectedMovieId !== null ? movies.find(m => String(m.id) === String(selectedMovieId)) : null;


  // Toggle av/på ett säte.
    function handleSeatClick(seatId: number) {
        setSeats((prev) =>
        prev.map((seat) =>
            seat.id === seatId ? { ...seat, selected: !seat.selected } : seat
        ));
    } 
    
    // Validerar att film och minst ett säte är valt innan bokningsmodulen öppnas.
    function handleContinueClick() {
        const selectedCount = seats.filter((seat) => seat.selected).length;

        if (!selectedMovieId) {
            setWarningMessage("Please select a movie.");
            return;
        }
        if (selectedCount === 0) {
            setWarningMessage("Please select at least one seat.");
            return;
        }

        setWarningMessage("");
        setShowBookingModule(true);
    }

    function handleBooking(payload: Booking) {
    const seatIds = seats.filter(s => s.selected).map(s => s.id);
    
    const bookingPayload = {
        name: payload.name,
        phone: payload.phone,
        movieId: Number(payload.movieId), // Convert to number
        seats: seatIds
    };
    
    createBooking(bookingPayload)
        .then(() => {
            return getBookings();
        })
        .then((updatedBookings) => {
            setBookings(updatedBookings);
            setSeats(prevSeats =>
                prevSeats.map(seat =>
                    seatIds.includes(seat.id) ? 
                    { ...seat, selected: false } : seat
                )
            );
            setShowBookingModule(false);
            setWarningMessage("");
        })
        .catch((err) => setWarningMessage(err.message));
    }


    const selectedSeatCount = seatsView.filter(s => s.selected).length;
    const totalPrice = selectedSeatCount * (selectedMovie?.price ?? 0);


    return {
        movies,
        seats: seatsView,
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
    };

    
}

