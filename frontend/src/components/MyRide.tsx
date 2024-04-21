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
    }, []);

    const handleCompleteRide = async (rideId) => {
        await props.carpool.completeRide(rideId);
        fetchRides();
    };

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
                    value={driverId}
                    onChange={(e) => setDriverId(parseInt(e.target.value))}
                    className="p-2 border rounded mr-2"
                    placeholder="Enter Driver ID"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchRides}>Search</button>
            </div>
            <h2>My Rides</h2>
            {  /*   <ul>
                {rides.map(ride => (
                    <li key={ride.rideId} className={`border p-4 my-4 ${ride.isComplete ? 'border-green-500' : 'border-red-500'}`}>
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{ride.origin} to {ride.destination}</h3>
                                {!ride.isComplete && parseInt(ride.userId) === -1 && (
                                    <p className="text-red-600">Not Booked</p>
                                )}
                                <p>Departure Time: {formatTime(parseInt(ride.departuretime))}</p>
                                {/* formatTime(ride.departuretime) 
                            </div>
                            {!ride.isComplete && parseInt(ride.userId) !== -1 && (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCompleteRide(ride.rideId)}>Complete</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            */}
            {rides.map((ride) => (
                <div className={`border border-r-2 h-32 ${ride.isComplete ? 'border-green-600' : 'border-blue-500'}  ${parseInt(ride.userId) === -1 ? 'border-red-600' : 'border'}`}>
                    <div>
                        <h1 className='text-lg font-bold'>{ride.origin} to {ride.destination}</h1>
                    </div>
                    <div className='flex justify-around'>
                        <div>
                            {ride.accAddress}
                            <p>Departure Time:{formatTime(parseInt(ride.departuretime))} </p>
                            <p>Reach Time: {formatTime(parseInt(ride.approxReachTime))}</p>
                        </div>
                        <div>
                            {ride.isComplete && <p className="text-green-600 font-bold">completed</p>}
                            {!ride.isComplete && parseInt(ride.userId) === -1 && <p className="text-red-600 font-bold">Not Booked</p>}
                            {!ride.isComplete && parseInt(ride.userId) !== -1 && < p className="text-blue-600 font-bold" >Booked</p>}
                        </div>
                        <div>
                            {!ride.isComplete && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCompleteRide(ride.rideId)}>Complete</button>}</div>
                    </div>
                </div>))
            }
            {/* <div className='border border-r-2 h-32'>
                <div>
                    <h1 className='text-lg font-bold'>hell to xyz</h1>
                </div>
                <div className='flex justify-around'>
                    <div>  <p>Departure Time:2:2 </p>
                        <p>Reach Time:2:2 </p>
                    </div>
                    <div>
                        <p className="text-red-600 font-bold">Not Booked</p>
                        <p className="text-green-600 font-bold">completed</p>
                        <p className="text-blue-600 font-bold" >Booked</p></div>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCompleteRide(ride.rideId)}>Complete</button></div>
                </div>
            </div> */}
        </div >
    );
};

export default MyRide;
