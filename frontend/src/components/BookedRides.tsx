import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

const BookedRide = (props) => {
    const [rides, setRides] = useState([]);
    const [userIndex, setUserIndex] = useState(1);
    const [showPayDialog, setShowPayDialog] = useState(false); // State to track dialog visibility
    const [fareToPay, setFareToPay] = useState(0); // State to track fare amount to pay
    const [selectedRideId, setSelectedRideId] = useState(null); // State to track the selected ride ID
    const [addressFrom, setAddressFrom] = useState();
    const [addressTo, setAddressTo] = useState();

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

    const handlePayButtonClick = (rideId, fare, to) => {
        setAddressTo(to);
        setSelectedRideId(rideId); // Set the selected ride ID
        setFareToPay(fare); // Set the fare amount to pay
        setShowPayDialog(true); // Open the dialog
    };

    const handlePayDialogClose = () => {
        setShowPayDialog(false); // Close the dialog
    };
    const { ethereum } = window as WindowWithEthereum;
    const test = async () => {

    };

    const handlePayDialogConfirm = async () => {
        try {
            if (ethereum) {
                const valInEth = fareToPay;
                const valInWei = ethers.parseEther(valInEth.toString()); // Convert to Wei
                const valInHex = '0x' + valInWei.toString(16); // Convert to hexadecimal string

                console.log(valInHex);

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from: addressFrom,
                            to: addressTo,
                            gas: "0x5208",
                            value: valInHex,
                        },
                    ],
                });
            }
            // Call the smart contract function to pay the fare
            // const tr = await props.carpool.payFare(selectedRideId, { value: fareToPay });
            // await tr.wait();
            // Refresh the booked rides after payment
            fetchBookedRides();
            setShowPayDialog(false); // Close the dialog after payment
        } catch (error) {
            console.error('Error paying fare:', error);
        }
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
                        <div className="flex justify-around">
                            <div>
                                {ride.accAddress}
                                <h3 className="text-lg font-bold">{ride.origin} to {ride.destination}</h3>
                                <p>Departure Time: {formatTime(parseInt(ride.departuretime))}</p>
                                <p>Approximate Reach Time: {formatTime(parseInt(ride.approxReachTime))}</p>
                            </div>
                            <div className='flex '>
                                Fare : <p className="font-bold mr-2 ml-2">{parseInt(ride.fare)}  </p>  ETH
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => handlePayButtonClick(parseInt(ride.rideId), parseInt(ride.fare), ride.accAddress)}>Pay Fare</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Pay Dialog */}
            {showPayDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white rounded-lg p-8">
                        <h2 className="text-lg font-bold mb-4">Pay Fare</h2>
                        <p className="mb-4">Fare Amount: {fareToPay} ETH</p>
                        <input type="text" value={addressFrom} placeholder="Enter Payment Reference" className="border p-2 rounded mb-4" onChange={(e) => setAddressFrom(e.target.value)} />
                        <div className="flex justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayDialogClose}>Cancel</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayDialogConfirm}>Pay</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookedRide;
