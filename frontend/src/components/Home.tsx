import React from 'react';
import styles from "./index.css";

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'>Create Ride</button>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Book Ride</button>
        </div>
    );
}

export default Home;
