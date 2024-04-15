import { Spinner } from '@material-tailwind/react';
import Dialog from './smallCompo/Dialog';
import React, { useState } from 'react';
import CreateDriver from './smallCompo/CreateDriver';
import { useNavigate } from 'react-router-dom';
const CreateRide = (props: any) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [fare, setFare] = useState(0);
    const [seats, setSeats] = useState(1);
    const [deptTime, setDeptTime] = useState('');
    const [reachTime, setReachTime] = useState('');
    const [testDeptTime, setTestDeptTime] = useState('');
    const [testReach, setTestReach] = useState('');
    const [processing, setProcessing] = useState(false);
    // const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [driver, setDriver] = useState(-1);
    const [driverCreted, setDriverCreated] = useState(true);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const carpoolContract = props.carpool;

    const navigate = useNavigate();
    const handleCreateRide = async (e: any) => {
        e.preventDefault();
        const [hours, minutes] = testDeptTime.split(':');
        console.log(hours, minutes);
        // Split the time into hours and minutes
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        setDeptTime(totalMinutes.toString());

        const [hours1, minutes1] = testReach.split(':'); // Split the time into hours and minutes
        const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
        setReachTime(totalMinutes1.toString());
        console.log(totalMinutes);
        try {
            // Call the contract method to create a ride
            const tx = await carpoolContract.createride(origin, destination, parseInt(deptTime), fare, seats, driver, 0, parseInt(reachTime), false);

            // Wait for the transaction to be confirmed
            await tx.wait();

            // Reset the form fields
            setProcessing(true);
            setOrigin('');
            setDestination('');
            setFare(0);
            setSeats(1);
            setTestDeptTime('');
            setTestReach('');
            setSuccessModalOpen(true);

            // Optionally, you can fetch the updated list of rides here and update the UI
            // props.fetchRides();
        } catch (error) {
            console.error('Error creating ride:', error);
        } finally {
            setProcessing(false); // Stop processing
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
        <div className="container mx-auto mt-8">

            {driver == -1 && <CreateDriver carpool={carpoolContract} setDriver={setDriver} />}
            {driver != -1 && driverCreted && <Dialog closeModal={closeModal} string1="Driver Created" string2={`Driver Id: ${driver}`} />}
            {successModalOpen && <Dialog closeModal={closeModal} string1="Ride Created Successfully" string2="Your ride has been successfully created" />
            }
            {processing && <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>}
            {driver != -1 && <div>
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold mb-4">Create a Ride</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => { navigate('/myRides') }} >show rides</button>
                </div>

                <form onSubmit={handleCreateRide}>
                    <div className="mb-4">
                        <label htmlFor="origin" className="block text-sm font-semibold">Origin</label>
                        <input
                            type="text"
                            id="origin"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="destination" className="block text-sm font-semibold">Destination</label>
                        <input
                            type="number"
                            id="destination"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fare" className="block text-sm font-semibold">Fare</label>
                        <input
                            type="number"
                            id="fare"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={fare}
                            onChange={(e) => setFare(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="seats" className="block text-sm font-semibold">Available Seats</label>
                        <input
                            type="number"
                            id="seats"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={seats}
                            onChange={(e) => setSeats(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deptTime" className="block text-sm font-semibold">Departure Time</label>
                        <input
                            type="time"
                            id="deptTime"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={testDeptTime}
                            onChange={(e) => setTestDeptTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deptTime" className="block text-sm font-semibold">Approx Reach Time</label>
                        <input
                            type="time"
                            id="reachTime"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            value={testReach}
                            onChange={(e) => setTestReach(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Ride
                    </button>
                </form>
            </div>
            }

        </div>
    );
};

export default CreateRide;
