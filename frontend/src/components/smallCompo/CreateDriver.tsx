import React, { useState } from 'react';

const CreateDriver = (props: any) => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const carpoolContract = props.carpool;
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (phoneNo.length !== 10) {
            setErrorMessage('Phone number must be 10 digits long.'); return
        }
        if (address.length != 42) {
            setErrorMessage('Address must be 42 digits long.'); return

            // console.log(name, phoneNo, address
        }
        // Convert phoneNo to integer
        const parsedPhoneNo = parseInt(phoneNo);
        const tx = await carpoolContract.createDriver(name, address, parsedPhoneNo);

        // Pass parsedPhoneNo instead of phoneNo

        // Wait for the transaction to be confirmed
        await tx.wait();
        // console.log(tx);
        setName(tx);
        props.setOpenDriver(false)
        const driverId = await carpoolContract.getDriverCnt();
        console.log(driverId);
        props.setDriver(parseInt(driverId) - 1);
        props.setDriverAddress(address);
        props.setDriverCreated(true);
        // Here you can perform any action like calling a function to create a driver on the blockchain
        // console.log('Submitting driver creation form:', { name, parsedPhoneNo }); // Log parsedPhoneNo instead of phoneNo
        // Clear the form fields after submission
        setName('');
        setPhoneNo('');
    };

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Create Driver</h2>
            {errorMessage && (
                <div className="text-red-600 font-medium mb-4">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNo"
                        name="phoneNo"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
                        Wallet Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                >
                    Create Driver
                </button>
            </form>
        </div>
    );
};

export default CreateDriver;
