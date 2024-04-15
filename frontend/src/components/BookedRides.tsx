import React, { useEffect, useState } from 'react';

const BookedRide = (props) => {
    const [rides, setRides] = useState([]);
    const [userIndex, setUserIndex] = useState(1);

    const fetchBookedRides = async () => {
        const allRides = await props.carpool.getAllRides();
        console.log(allRides);
        const bookedRides = allRides.filter(ride => parseInt(ride.userId) === userIndex);
        setRides(bookedRides);
    };

    useEffect(() => {
        fetchBookedRides();
    }, [userIndex]);

    const formatTime = (timestamp) => {
        const hours = parseInt(timestamp / 60)
        const min = parseInt(timestamp % 60)
        return `${hours}:${min}`;
    };


    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between mb-4">
                <input
                    type="number"
                    value={userIndex}
                    onChange={(e) => setUserIndex(parseInt(e.target.value))}
                    className="p-2 border rounded mr-2"
                    placeholder="Enter User Index"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchBookedRides}>Search</button>
            </div>
            <h2>Booked Rides</h2>
            <ul>
                {rides.map(ride => (
                    <li key={ride.rideId} className={`border p-4 my-4 ${ride.isComplete ? 'border-green-500' : 'border-red-500'}`}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{ride.origin} to {ride.destination}</h3>
                                <p>Departure Time: {formatTime(parseInt(ride.departuretime))}</p>
                                <p>Approximate Reach Time: {formatTime(parseInt(ride.approxReachTime))}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookedRide;
