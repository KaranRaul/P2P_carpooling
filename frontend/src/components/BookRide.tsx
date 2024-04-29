import { useEffect, useState } from 'react';
import Dialog from './smallCompo/Dialog';
import image from '../images/image1.png'
import { useNavigate } from 'react-router-dom';
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
const BookRide = (props: { props: any }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>();
    // const [fetchingRides, setFetchingRides] = useState(false);
    const [gender, setGender] = useState('');
    const [userIndex, setUserIndex] = useState<Number>(-1);
    const [userDialog, setUserDialog] = useState(false);
    // const [userAdded, setUserAdded] = useState(false);
    const [rides, setRides] = useState([]);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState<Ride[]>([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    // const [users, setUsers] = useState([]);
    const [userAlreadyExist, setUserAlreadyExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fetchRides = async () => {

        // setFetchingRides(true); // Start fetching rides

        //@ts-ignore
        const allRides = await props.carpool.getAllRides();
        setRides(allRides);

        // setFetchingRides(false);
    };
    const fetchUsers = async () => {
        //@ts-ignore
        const allUsers = await props.carpool.getUsers();
        console.log(allUsers);
        //@ts-ignore
        const test = await props.carpool.ridecount;
        console.log(test);
        // setUsers(allUsers);
    };

    const handleSearch = () => {
        console.log(rides);
        fetchRides();
        // setFetchingRides(true);
        // Filter rides based on origin and destination
        //@ts-ignore
        const filteredRides = rides.filter(ride => ride.origin.toString() === origin && ride.destination.toString() === destination);
        // setFetchingRides(false);
        setSearchResults(filteredRides);
    };
    const formatTime = (timestamp: any) => {
        timestamp = parseInt(timestamp);
        const hours = (timestamp / 60).toFixed()
        const min = Math.abs(timestamp % 60).toFixed()
        return `${hours}:${min}`;
    };
    const addUser = async (e: any) => {
        e.preventDefault();

        // Create a new user with the provided information
        // const test = await props.carpool.createUser(name, parseInt(age), gender === 'male' ? true : false);
        // await test.wait;
        if (age && age < 0) {
            setErrorMessage('Age must be a positive integer');
            return;
        }
        //@ts-ignore
        const newUserIndex = await props.carpool.createUser(name, parseInt(age), gender === 'male' ? true : false);
        await newUserIndex.wait();
        fetchUsers();
        //@ts-ignore
        const test = await props.carpool.getUserCnt();
        setUserIndex(parseInt(test) - 1);
        console.log(test);
        setUserDialog(true);


        // setUserAdded(true);
        setUserAlreadyExists(false);
        // Reset the input fields
        setName('');
        setAge(0);
        setGender('');
    };

    const rideBooked = () => {
        setSearchResults([]);
        setOrigin("");
        setDestination("");
        setBookingSuccess(true); // Set booking success to true
    };

    const handleBookRide = async (rideId: number) => {
        try {
            // Call the bookRide function from the contract
            //@ts-ignore
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
        <div className="grid grid-cols-2 gap-4 justify-around container mx-auto mt-8">
            <div className="col-span-1 flex justify-center items-center">
                <img src={image} alt="Image" className="w-1/2 h-auto rounded-md" />
            </div>


            <div className="col-span-1 bg-slate-400 h-screen w-full">

                <div className='flex flex-col justify-center items-center m-12'>
                    {userDialog && <Dialog closeModal={closeModal} string1="User Created Successfully" string2={`User ID: ${userIndex}`} />}


                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-2xl font-bold">Book a Ride</h2>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/bookedRides')}>Show Booked Rides</button>
                    </div>

                    {bookingSuccess && (
                        //@ts-ignore
                        <Dialog closeModal={() => { setBookingSuccess(false) }} string1="Ride Booked Successfully" />
                    )}
                    <button
                        onClick={() => setUserAlreadyExists(true)}
                        className='relative  mb-4 flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out'>Create New User</button>
                    {userAlreadyExist && (
                        <div className="bg-white p-10 rounded-md shadow-md w-4/5">
                            {errorMessage && (
                                <div className="text-red-600 font-medium mb-4">{errorMessage}</div>
                            )}
                            <form onSubmit={addUser} className="flex flex-col items-center w-full"> {/* Make the form full-width */}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-2xl font-bold mb-4">Add User Information</h2>

                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        value={age}
                                        onChange={(e) => setAge(parseInt(e.target.value))}
                                        required
                                    />
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"> {/* Make the button full-width */}
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {(
                        <div className="flex flex-col items-center mt-8">
                            <div className="flex mb-4 space-x-4">
                                <input
                                    type="number"
                                    placeholder="User ID"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={userIndex.toString()}
                                    onChange={(e) => setUserIndex(parseInt(e.target.value))}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Origin"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Destination"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
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

                                <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 w-3/5">
                                    {searchResults.map(ride => (
                                        <div key={ride.rideId} className="text-black font-bold w-full  border border-gray-300 rounded p-4">
                                            <p className="text-xl font-bold mb-2">{ride.origin} to {ride.destination}</p>
                                            <p className="text-gray-600">Seats Available: {ride.seats.toString()}</p>
                                            <p className="text-gray-600">Departure Time: {formatTime(ride.departuretime)}</p>
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
                        </div>
                    )}
                </div>
            </div>
        </div >


    );
};

export default BookRide;
