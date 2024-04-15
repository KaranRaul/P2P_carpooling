import React, { useEffect, useState } from 'react';

const MyRide = (props) => {
    const [rides, setRides] = useState([]);
    const [driverId, setDriverId] = useState();

    const fetchRides = async () => {
        const driverRides = await props.carpool.getAllRides();
        const filteredRides = driverRides.filter(ride => parseInt(ride.driverId) === driverId);
        setRides(filteredRides);
    };

    useEffect(() => {
        fetchRides();
    }, [driverId]);

    const handleCompleteRide = async (rideId) => {
        await props.carpool.completeRide(rideId);
        fetchRides();
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString();
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between mb-4">
                <input
                    type="number"
                    value={driverId}
                    onChange={(e) => setDriverId(parseInt(e.target.value))}
                    className="p-2 border rounded mr-2"
                    placeholder="Enter Driver ID"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchRides}>Search</button>
            </div>
            <h2>My Rides</h2>
            <ul>
                {rides.map(ride => (
                    <li key={ride.rideId} className={`border p-4 my-4 ${ride.isComplete ? 'border-green-500' : 'border-red-500'}`}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{ride.origin} to {ride.destination}</h3>
                                {!ride.isComplete && ride.userId === -1 && (
                                    <p className="text-red-600">Not Booked</p>
                                )}
                                <p>Departure Time: { }</p>
                                {/* formatTime(ride.departuretime) */}
                            </div>
                            {!ride.isComplete && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCompleteRide(ride.rideId)}>Complete</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyRide;
