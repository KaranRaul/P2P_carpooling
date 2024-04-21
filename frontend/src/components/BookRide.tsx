import React, { useEffect, useState } from 'react';
import { Ride } from '../context/RideContext';
import Dialog from './smallCompo/Dialog';
// import { Dialog } from '@material-tailwind/react';
import { Navigate, useNavigate } from 'react-router-dom';
const BookRide = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [fetchingRides, setFetchingRides] = useState(false);
    const [gender, setGender] = useState('');
    const [userIndex, setUserIndex] = useState<Number>(-1);
    const [userDialog, setUserDialog] = useState(true);
    const [userAdded, setUserAdded] = useState(false);
    const [rides, setRides] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState<Ride[]>([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const fetchRides = async () => {
        setFetchingRides(true); // Start fetching rides

        const allRides = await props.carpool.getAllRides();
        setRides(allRides);

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
    const formatTime = (timestamp) => {
        const hours = parseInt(timestamp / 60)
        const min = parseInt(timestamp % 60)
        return `${hours}:${min}`;
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
    const closeModal = () => {
        setUserDialog(false);
    }

    useEffect(() => {
        fetchRides();
        fetchUsers();
    }, []);


    return (
        <div className="container mx-auto mt-8">
            {userIndex != -1 && userDialog && <Dialog closeModal={closeModal} string1="User Created Successfully" string2={`User ID: ${userIndex}`} />}

            <div className='flex justify-between'>
                {/* <h2 className="text-2xl font-bold mb-4">Users</h2> */}
                <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/bookedRides')}> show booked rides</button>

            </div>
            {/* <ul>
                {users.length > 0 && users.map((user, index) => (
                    <li key={index}>{user.name}, Age: {user.age}, Gender: {user.gender ? 'Male' : 'Female'}</li>
                ))}
            </ul> */}
            {/* Booking success dialog test */}
            {bookingSuccess && (<Dialog closeModal={() => { setBookingSuccess(false) }} string1="Ride Booked Successfully" />
            )}
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
                                <p className="text-gray-600">Departure Time: {formatTime(parseInt(ride.departuretime))}</p>
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
