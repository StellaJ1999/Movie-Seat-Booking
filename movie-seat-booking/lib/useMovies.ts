import { useState, useEffect } from "react";
import { Movie } from "./types";
import { getMovies } from "./api";

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [warningMessage, setWarningMessage] = useState<string>("");

    useEffect(() => {
        getMovies()
            .then(setMovies)
            .catch((err) => setWarningMessage(err.message));
    }, []);

    return {
        movies,
        setMovies,
        warningMessage,
        setWarningMessage
    };
    
}