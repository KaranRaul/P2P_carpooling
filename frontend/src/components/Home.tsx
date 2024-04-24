import React from 'react';
import styles from "./index.css";
import image from "./image.png"
import { useNavigate } from 'react-router-dom';
// import { useNavigation } from '@react-navigation/native';
const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            <button onClick={() => {
                navigate('./createRide')
            }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'>Create Ride</button>

            <button onClick={() => {
                navigate('./bookRide')
            }} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Book Ride</button>
        </div>
    );
}

export default Home;
