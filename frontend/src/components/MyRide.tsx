import { useEffect, useState } from 'react';
interface Ride {
    rideId: number;
    driverId: number;
    userId: number;
    origin: string;
    destination: string;
    departuretime: number;
    fare: number;
    seats: number;
    isComplete: boolean;
    approxReachTime: number;
    accAddress: string;
    payment: boolean;
}

const MyRide = (props: { props: any }) => {
    const [rides, setRides] = useState<Ride[]>([]);
    const [driverId, setDriverId] = useState<number>();

    const fetchRides = async () => {
        //@ts-ignore
        const driverRides = await props.carpool.getAllRides();
        //@ts-ignore
        const filteredRides = driverRides.filter(ride => parseInt(ride.driverId) === driverId);
        setRides(filteredRides);
    };

    useEffect(() => {
        fetchRides();
    }, []);
    //@ts-ignore
    const handleCompleteRide = async (rideId) => {
        //@ts-ignore
        await props.carpool.completeRide(rideId);
        fetchRides();
    };

    const formatTime = (timestamp: any) => {
        timestamp = parseInt(timestamp);
        const hours = (timestamp / 60).toFixed()
        const min = Math.abs(timestamp % 60).toFixed()
        return `${hours}:${min}`;
    };

    return (
        <div className="container flex flex-col justify-center items-center m-16">
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

            {rides.map((ride) => (
                <div className="flex justify-between bg-gray-200 rounded-lg p-4 mb-4 w-3/5">
                    <div>
                        <h1 className="text-lg font-bold">{ride.origin} to {ride.destination}</h1>
                        {/* <p>{ride.accAddress}</p> */}
                        <p>Departure Time: {formatTime(ride.departuretime)}</p>
                        <p>Reach Time: {formatTime(ride.approxReachTime)}</p>
                    </div>
                    <div>
                        {ride.payment && <p className="text-green-600 font-bold">Payment Done</p>}
                        {ride.isComplete && <p className="text-green-600 font-bold">completed</p>}
                        {!ride.isComplete && ride.userId === -1 && <p className="text-red-600 font-bold">Not Booked</p>}
                        {!ride.isComplete && ride.userId !== -1 && <p className="text-blue-600 font-bold">Booked</p>}
                        {!ride.isComplete && ride.userId !== -1 && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCompleteRide(ride.rideId)}>Complete</button>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyRide;