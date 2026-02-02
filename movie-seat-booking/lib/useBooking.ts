import {useState, useEffect, useMemo} from 'react';
import { getBookings, createBooking } from "./api";
import { Booking, Seat } from "./types";
import { useMovies } from './useMovies';

export function useBooking() {
    const { movies } = useMovies();
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

    useEffect(() => {
        getBookings()
            .then((bookingsData) => {
                setBookings(bookingsData);
                if (movies.length > 0) {
                    setSelectedMovieId(movies[0].id);
                }
            })
            .catch((err) => {
                setWarningMessage(err.message);
            });
    }, [movies]);

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
    const seatsView: Seat[] = useMemo(() => seats.map((s) => ({
        ...s,
        occupied: occupiedSeatIds.has(s.id),
        selected: occupiedSeatIds.has(s.id) ? false : s.selected,
      })),
        [seats, occupiedSeatIds]
    );
    
    // Hitta vald film baserat på selectedMovieId
    const selectedMovie = selectedMovieId !== null ? movies.find(m => String(m.id) === String(selectedMovieId)) : null;
    const selectedSeatCount = seatsView.filter(s => s.selected).length;
    const totalPrice = selectedSeatCount * (selectedMovie?.price ?? 0);

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


    function handleBooking(booking: Booking) {
        const seatIds = seats.filter(s => s.selected).map(s => s.id);
        
        const bookingPayload = {
            name: booking.name,
            phone: booking.phone,
            movieId: Number(booking.movieId),
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

    // Väljer film och nollställer de säten som är valda.
    const setSelectedMovie = (id: string | number) => {
        const numId = Number(id);
        setSelectedMovieId(numId);
        setSeats(prevSeats => prevSeats.map(seat => ({ ...seat, selected: false })));
    };

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

