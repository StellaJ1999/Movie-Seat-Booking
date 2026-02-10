# Overview
A Next.js React application for booking movie seats with an admin panel to manage movies.

# Core Features

## User Booking:

- Browse available movies
- Select seats dynamically
- Validate selections before booking
- Submit bookings with name and phone
- Real-time seat status updates (available, selected, occupied)
- Dynamic price calculation

## Admin Panel:

- Create new movies (title, year, price)
- Update existing movies
- Delete movies
- Movie selector dropdown for updates/deletes

# Architecture

## Components:

- page.tsx - Main page with movie/seat selection
- BookingModule.tsx - Booking form modal
- AdminModule.tsx - Admin CRUD forms
- MovieSelector.tsx - Shared dropdown component
- WarningMessage.tsx - Error/validation messages
- AdminButton.tsx - Toggle admin panel button

# Custom Hooks:

- useBooking() - Handles seat selection, bookings, API sync
- useAdmin() - Handles movie CRUD operations
- useMovies() - Shared movie state between hooks

# API:

- lib/api.ts - Fetch functions for movies & bookings
- json-server backend (port 3002)

# Data:

lib/types.ts - TypeScript interfaces (Movie, Seat, Booking)

# LogBook:

## Day 1 :
- Separate html from (https://github.com/aspcodenet/javascriptmovieseatbookSTART) into components and apply classNames.
- Apply styling from (https://github.com/aspcodenet/javascriptmovieseatbookSTART)
- Set up page.tsx with components.
- Implement functions to assign index to each seat.
- Toggle seat between selected and N/A.

## Day 2:
- Set up json server with endpoints movies and bookings.
- Set up booking module component.
- Style booking module.
- Toggle booking module.
- Validation to continue to booking module.
- Validate inputs in booking module.
- Toggle seat status from selected to occupied.
- Post bookings to api.
- Get bookings from api.
- Get movies from api.

## Day 3: 
- Create .env file.
- Create lib/api.ts to separe api calls.
- Create custom useBooking hook to separe all booking logic from page.tsx.
- Debugging and cleaning code.
- Dynamic updates of total price and amount of seats.

## Day 4:
- Create lib/types to separate interfaces.
- Code cleanup.

## Day 5:
- Separate movie logic into it's own custom hook.
- Create CRUD functions for movies in api.ts.
- Create custom useAdmin hook to handle movie CRUD operations.
- Create and style AdminModule.

## Day 6:
- Wire up page.tsx and AdminModule with useAdmin hook.
- Fill in update forms input with selected movies values.
