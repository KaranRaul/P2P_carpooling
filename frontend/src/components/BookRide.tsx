import React, { useEffect, useState } from 'react';
import { Ride } from '../context/RideContext';

const BookRide = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fetchingRides, setFetchingRides] = useState(false);
    const [gender, setGender] = useState('');
    const [userIndex, setUserIndex] = useState<Number>();
    const [userAdded, setUserAdded] = useState(false);
    const [rides, setRides] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState<Ride[]>([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const fetchRides = async () => {
        setFetchingRides(true); // Start fetching rides
        const allRides = await props.carpool.getAllRides();
        setRides(allRides);
        // setSearchResults(allRides); // Set search results initially to all rides
        setFetchingRides(false);
    };

    const handleSearch = () => {
        console.log(rides);
        fetchRides();
        setFetchingRides(true);
        // Filter rides based on origin and destination
        const filteredRides = rides.filter(ride => ride.origin.toString() === origin && ride.destination.toString() === destination);
        setFetchingRides(false);
        setSearchResults(filteredRides);
    };

    const addUser = (e) => {
        e.preventDefault();

        // Create a new user with the provided information
        props.carpool.createUser(name, parseInt(age), gender === 'male' ? true : false);

        // Get the index of the newly created user by accessing the length of the person array
        const newUserIndex = props.carpool.person.length - 1;

        // Set the index of the newly created user in the state
        setUserIndex(newUserIndex);

        // Set userAdded to true to indicate that a user has been added
        setUserAdded(true);

        // Reset the input fields
        setName('');
        setAge('');
        setGender('');
    };

    const rideBooked = () => {
        setSearchResults("");
        setOrigin("");
        setDestination("");
        setBookingSuccess(true); // Set booking success to true
    };

    const handleBookRide = async (rideId) => {
        try {
            // Call the bookRide function from the contract
            await props.carpool.bookRide(rideId);
            rideBooked();
            console.log('Ride booked successfully!');
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        // fetchRides();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            {fetchingRides && <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>}
            {/* Booking success dialog test */}
            {bookingSuccess && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                        {/* Success Icon */}
                                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {/* Checkmark Icon */}
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium text-gray-900">Ride booked successfully!</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setBookingSuccess(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
            <h2 className="text-xl font-bold mb-3">Add User Information</h2>
            {/* {!userAdded && <form onSubmit={addUser} className="mb-4">
                <div className="flex items-center space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border border-gray-300 rounded px-3 py-2 w-1/3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        className="border border-gray-300 rounded px-3 py-2 w-1/3"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-1/3"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Submit
                </button>
            </form>} */}
            {!userAdded && <div className="flex flex-col items-center">
                <div className="flex mb-4 space-x-4">
                    <input
                        type="text"
                        placeholder="Origin"
                        className="border border-gray-300 rounded px-3 py-2 w-1/2"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Destination"
                        className="border border-gray-300 rounded px-3 py-2 w-1/2"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                >
                    Search
                </button>
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {searchResults.map(ride => (
                            <div key={ride.rideId} className="border border-gray-300 rounded p-4">
                                <p className="text-xl font-bold mb-2">{ride.origin} to {ride.destination}</p>
                                <p className="text-gray-600">Seats Available: {ride.seats.toString()}</p>
                                <p className="text-gray-600">Departure Time: {ride.departuretime.toString()}</p>
                                <button
                                    onClick={() => handleBookRide(ride.rideId)}
                                    className="bg-green-500 text-white px-3 py-1 rounded mt-2 hover:bg-green-600"
                                >
                                    Book Ride
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No rides found.</p>
                )}
            </div>}
        </div>
    );
};

export default BookRide;
