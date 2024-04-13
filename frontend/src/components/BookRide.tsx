import React, { useEffect, useState } from 'react';
import { Ride } from '../context/RideContext';
import { Dialog } from '@material-tailwind/react';

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
    const [users, setUsers] = useState([]);
    const fetchRides = async () => {
        setFetchingRides(true); // Start fetching rides
        // const allRides = await props.carpool.getAllRides();
        // setRides(allRides);
        // console.log(allRides);
        // console.log(props.carpool);
        // if (props.carpool) {
        const allRides = await props.carpool.getAllRides();
        setRides(allRides);
        console.log(allRides);
        // setSearchResults(allRides);
        // } else {
        //     console.error("Carpool object or getAllRides function is not defined");
        // }
        // setSearchResults(allRides); // Set search results initially to all rides
        setFetchingRides(false);
    };
    const fetchUsers = async () => {
        const allUsers = await props.carpool.getUsers();
        console.log(allUsers);
        const test = await props.carpool.ridecount;
        console.log(test);
        setUsers(allUsers);
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

    const addUser = async (e) => {
        e.preventDefault();

        // Create a new user with the provided information
        // const test = await props.carpool.createUser(name, parseInt(age), gender === 'male' ? true : false);
        // await test.wait;
        const newUserIndex = await props.carpool.createUser(name, parseInt(age), gender === 'male' ? true : false);
        await newUserIndex.wait();
        fetchUsers();
        const test = await props.carpool.getUserCnt();
        setUserIndex(parseInt(test) - 1);
        console.log(test);

        // console.log(newUserIndex);
        // console.log(await props.carpool.userCnt);
        // console.log(test);
        // test.map((user) => {
        //     console.log(user.name);
        // });



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
            await props.carpool.bookRide(rideId, userIndex);
            rideBooked();
            console.log('Ride booked successfully!');
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        fetchRides();
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul>
                {users.length > 0 && users.map((user, index) => (
                    <li key={index}>{user.name}, Age: {user.age}, Gender: {user.gender ? 'Male' : 'Female'}</li>
                ))}
            </ul>
            {fetchingRides && <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>}
            {/* Booking success dialog test */}
            {bookingSuccess && (<Dialog setSuccess={setBookingSuccess} />
            )}
            <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
            <h2 className="text-xl font-bold mb-3">Add User Information</h2>
            {!userAdded && <form onSubmit={addUser} className="mb-4">
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
            </form>}
            {userAdded && <div className="flex flex-col items-center">
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
