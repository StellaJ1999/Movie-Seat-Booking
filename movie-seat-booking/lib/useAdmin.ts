 import React from "react";
import { useState, useCallback, useMemo } from "react";
import { createMovie, updateMovie, deleteMovie } from "./api";
import { useMovies } from "./useMovies";


export function useAdmin() {

    const { movies, setMovies, warningMessage, setWarningMessage } = useMovies();
    const [showAdminModule, setShowAdminModule] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

    const [newTitle, setNewTitle] = useState("");
    const [newYear, setNewYear] = useState("");
    const [newPrice, setNewPrice] = useState<number | "">("");

    
    const [editTitle, setEditTitle] = useState("");
    const [editYear, setEditYear] = useState("");
    const [editPrice, setEditPrice] = useState<number | "">("");


    const handleSelectMovie = useCallback((id: number | string | null) => {
        const numId = typeof id === 'string' ? Number(id) : id;
        
        setSelectedMovieId(numId);
        
        if (numId === null) {
            setEditTitle("");
            setEditYear("");
            setEditPrice("");
            return;
        }

        const movie = movies.find(m => String(m.id) === String(numId));
        console.log("ID received:", id, "numId:", numId, "Found movie:", movie);
        console.log("Movies array:", movies);

        if (movie) {
            setEditTitle(movie.title);
            setEditYear(movie.year);
            setEditPrice(movie.price);
        } else {
            console.log("No movie found with ID:", numId);
        }
    }, [movies]);
    
    function handleAdminButtonClick() {
        setShowAdminModule(true);
    }

    async function handleCreateMovie(e: React.FormEvent) {
        e.preventDefault(); // Hindra att sidan laddas om vid form submission

        if (!newTitle || !newYear || newPrice === "") {
            setWarningMessage("All fields are required to create a movie.");
            return;
        }

        try {
            const createdMovie = await createMovie({
                id: 0,
                title: newTitle,
                year: String(newYear),
                price: Number(newPrice)
            });
            setMovies(prevMovies => [...prevMovies, createdMovie]);
            setNewTitle("");
            setNewYear("");
            setNewPrice("");
            setWarningMessage("");
        } catch (err) {
            setWarningMessage(err instanceof Error ? err.message : "Kunde inte skapa film.");

        }
    }

    async function handleUpdateMovie(e: React.FormEvent) {
        e.preventDefault();

        if (!selectedMovieId) {
            setWarningMessage("Please select a movie to update.");
            return;
        }

        if (!editTitle || !editYear || editPrice === "") {
            setWarningMessage("All fields are required to update a movie.");
            return;
        }

        try {
            const updatedMovie = await updateMovie(selectedMovieId, {
                id: selectedMovieId,
                title: editTitle,
                year: String(editYear),
                price: Number(editPrice)
            });
            setMovies(prevMovies => prevMovies.map(movie => movie.id === updatedMovie.id ? updatedMovie : movie));
            setWarningMessage("");
        } catch (err) {
            setWarningMessage(err instanceof Error ? err.message : "Failed to update film.");
        }
    }

    async function handleDeleteMovie() {
        if (!selectedMovieId) {
            setWarningMessage("Please select a movie to delete.");
            return;
        }

        try {
            await deleteMovie(selectedMovieId);
            setMovies(prevMovies => prevMovies.filter(movie => String(movie.id) !== String(selectedMovieId)));
            setSelectedMovieId(null);
            setEditTitle("");
            setEditYear("");
            setEditPrice("");
            setWarningMessage("");
        } catch (err) {
            setWarningMessage(err instanceof Error ? err.message : "Failed to delete film.");
        }
    }

    return {
        showAdminModule,
        setShowAdminModule,
        handleAdminButtonClick,
        movies,
        handleSelectMovie,
        selectedMovieId,
        newTitle,
        setNewTitle,
        newYear,
        setNewYear,
        newPrice,
        setNewPrice,
        editTitle,
        editYear,
        editPrice,
        setEditTitle,   
        setEditYear,
        setEditPrice,
        handleCreateMovie,
        handleUpdateMovie,
        handleDeleteMovie,
        warningMessage
    };
}