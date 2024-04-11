import React, { createContext, useState } from 'react';

// Define the type for the context value
interface RideContextType {
    rides: Ride[];
    bookRide: (rideId: number) => void;
}

// Define the type for a single ride
export interface Ride {
    rideId: number;
    origin: string,
    destination: string,
    fare: number,
    seats: number,

    // Add other properties as needed
}

// Create a new context with a default value
export const RideContext = createContext<RideContextType>({
    rides: [],
    bookRide: (rideId: number) => { },
});

// Create a provider component
export const RideProvider: React.FC = ({ children }) => {
    // State to manage ride data
    const [rides, setRides] = useState<Ride[]>([]);

    // Function to book a ride
    const bookRide = (rideId: number) => {
        // Implement your logic to book a ride
        console.log(`Ride with ID ${rideId} booked.`);
    };

    // Context value containing rides and bookRide function
    const contextValue: RideContextType = {
        rides,
        bookRide,
    };

    return (
        <RideContext.Provider value={contextValue}>
            {children}
        </RideContext.Provider>
    );
};
