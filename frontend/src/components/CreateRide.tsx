
import Dialog from './smallCompo/Dialog';
import { useState } from 'react';
import CreateDriver from './smallCompo/CreateDriver';
import { useNavigate } from 'react-router-dom';
import image from '../images/image.png'
const CreateRide = (props: any) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [fare, setFare] = useState(0);
    // const [errorMessage, setErrorMessage] = useState('');
    const [seats, setSeats] = useState(1);
    const [deptTime, setDeptTime] = useState('');
    const [reachTime, setReachTime] = useState('');
    const [testDeptTime, setTestDeptTime] = useState('');
    const [testReach, setTestReach] = useState('');
    // const [processing, setProcessing] = useState(false);
    // const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [driverId, setDriverId] = useState(0);
    const [driverCreted, setDriverCreated] = useState(false);
    const [openDriver, setOpenDriver] = useState(false)
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [driverAddress, setDriverAddress] = useState('');
    const carpoolContract = props.carpool;
    const navigate = useNavigate();
    const handleCreateRide = async (e: any) => {
        e.preventDefault();
        const [hours, minutes] = testDeptTime.split(':');
        // console.log(hours, minutes);
        // Split the time into hours and minutes
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        setDeptTime(totalMinutes.toString());

        const [hours1, minutes1] = testReach.split(':'); // Split the time into hours and minutes
        const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
        setReachTime(totalMinutes1.toString());
        console.log(totalMinutes);
        try {
            // console.log( driverId)
            if (!driverAddress) {
                const temp = await carpoolContract.getDriverAddress(driverId);
                console.log(temp);
                setDriverAddress(temp);
            }


            // Call the contract method to create a ride
            const tx = await carpoolContract.createride(origin, destination, parseInt(deptTime), fare, seats, driverId, 0, parseInt(reachTime), false, driverAddress);

            // Wait for the transaction to be confirmed
            await tx.wait();

            // Reset the form fields
            // setProcessing(true);
            setOrigin('');
            setDestination('');
            setFare(0);
            setSeats(1);
            setTestDeptTime('');
            setDriverCreated(false);
            setTestReach('');
            setDriverAddress('');
            setSuccessModalOpen(true);

            // Optionally, you can fetch the updated list of rides here and update the UI
            // props.fetchRides();
        } catch (error) {
            console.error('Error creating ride:', error);
        } finally {
            // setProcessing(false); // Stop processing
        }
    };
    // const handleChange = (e) => {
    //     const [hours, minutes] = e.target.value.split(':'); // Split the time into hours and minutes
    //     const totalMinutes = parseInt(hours) * 60 + parseInt(minutes); // Calculate total minutes
    //     setDeptTime(totalMinutes);
    // };
    const closeModal = () => {
        setSuccessModalOpen(false);
        setDriverCreated(false);
    };



    return (
        <div className="grid grid-cols-2 gap-4 justify-around container mx-auto mt-8">
            <div className="col-span-1 flex justify-center items-center">
                <img src={image} alt="Image" className="w-1/2 h-auto rounded-md" />
            </div>

            <div className="col-span-1 bg-slate-400 ">
                <button onClick={() => navigate('/myRides')} className=" m-12 relative flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">Created Rides</button>
                <div className='flex justify-center items-center m-12'>
                    <div className="bg-white p-10 rounded-md shadow-md  w-3/5 justify-center items-center">
                        <button onClick={() => setOpenDriver(true)} className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">Create new driver Id</button>
                        {openDriver && <CreateDriver setDriverCreated={setDriverCreated} setOpenDriver={setOpenDriver} setDriverAddress={setDriverAddress} carpool={carpoolContract} setDriver={setDriverId} />}
                        {driverCreted && <Dialog closeModal={closeModal} string1="Driver Created" string2={`Driver Id: ${driverId}`} />}
                        {successModalOpen && <Dialog closeModal={closeModal} string1="Ride Created Successfully" string2="Your ride has been successfully created" />}
                    </div>
                </div>
                <div className='flex justify-center items-center m-12'>
                    <div className="bg-white p-10 rounded-md shadow-md w-3/5">
                        <h2 className="text-2xl font-bold mb-4">Create a Ride</h2>

                        <form onSubmit={handleCreateRide} className="w-full max-w-sm">
                            <div className="mb-4">
                                <label htmlFor="driverId" className="block text-sm font-semibold">Driver Id</label>
                                <input
                                    type="number"
                                    id="driverId"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={driverId}
                                    onChange={(e) => setDriverId(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="origin" className="block text-sm font-semibold">Origin</label>
                                <input
                                    type="text"
                                    id="origin"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="destination" className="block text-sm font-semibold">Destination</label>
                                <input
                                    type="text"
                                    id="destination"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fare" className="block text-sm font-semibold">Fare in ETH</label>
                                <input
                                    type="number"
                                    id="fare"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={fare}
                                    onChange={(e) => setFare(parseInt(e.target.value))}
                                    required
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label htmlFor="seats" className="block text-sm font-semibold">Available Seats</label>
                                <input
                                    type="number"
                                    id="seats"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={seats}
                                    onChange={(e) => setSeats(e.target.value)}
                                    required
                                />
                            </div> */}
                            <div className="mb-4">
                                <label htmlFor="deptTime" className="block text-sm font-semibold">Departure Time</label>
                                <input
                                    type="time"
                                    id="deptTime"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={testDeptTime}
                                    onChange={(e) => setTestDeptTime(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="reachTime" className="block text-sm font-semibold">Approx Reach Time</label>
                                <input
                                    type="time"
                                    id="reachTime"
                                    className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                    value={testReach}
                                    onChange={(e) => setTestReach(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-2 py-2 font-medium tracking-wide text-black capitalize transition duration-300 ease-in-out transform rounded-xl hover:bg-gray-300 focus:outline-none active:scale-95"
                            >
                                Create Ride
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRide;
