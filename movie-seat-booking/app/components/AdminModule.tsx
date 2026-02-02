import React from "react";
import MovieSelector from "./MovieSelector";
import WarningMessage from "./WarningMessage";
import { useAdmin } from "@/lib/useAdmin";


type AdminModuleProps = {
    onClose?: () => void;
};

export default function AdminModule({ onClose }: AdminModuleProps) {

    const { 
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
        setEditTitle,
        editYear,
        setEditYear,
        editPrice,
        setEditPrice,
        handleCreateMovie,
        handleUpdateMovie,
        handleDeleteMovie,
        warningMessage 
    } = useAdmin();

    return (
        <div className="admin-overlay">
            <div className="admin-module">
                <div className="admin-module__header">
                    <h2>Edit Movies</h2>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="admin-module__close"
                    >
                        ×
                    </button>
                )}

                <form className="admin-module__form" onSubmit={handleCreateMovie}>
                    <h3>Create Movie</h3>
                    <label htmlFor="new-title">Title</label>
                    <input
                        id="new-title" 
                        type="text" 
                        placeholder="Title" 
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                    />

                    <label htmlFor="new-year">Year</label>
                    <input 
                    id="new-year" 
                    type="text" 
                    placeholder="Year" 
                    value={newYear}
                    onChange={e => setNewYear(e.target.value)}
                    />

                    <label htmlFor="new-price">Price</label>
                    <input 
                    id="new-price" 
                    type="number" 
                    placeholder="Price" 
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    />

                    <button type="submit">Create</button>
                </form>
                <form className="admin-module__form" onSubmit={handleUpdateMovie}>
                    <h3>Update / Delete Movie</h3>
                    <MovieSelector 
                    movies={movies}
                    selectedMovieId={selectedMovieId ?? null}
                    setSelectedMovie={(id) => handleSelectMovie(typeof id === 'string' ? Number(id) : id)}
                    />

                    <label htmlFor="edit-title">Title</label>
                    <input 
                    id="edit-title" 
                    type="text" 
                    placeholder="New title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} 
                    />

                    <label htmlFor="edit-year">Year</label>
                    <input 
                    id="edit-year" 
                    type="text" 
                    placeholder="New year" 
                    value={editYear}
                    onChange={e => setEditYear(e.target.value)}
                    />

                    <label htmlFor="edit-price">Price</label>
                    <input 
                    id="edit-price" 
                    type="number" 
                    placeholder="New price" 
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                    />

                    <div className="admin-module__actions">
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleDeleteMovie}>Delete</button>
                    </div>
                </form>
                <WarningMessage warningMessage={warningMessage} />
            </div>
        </div>
    );
}