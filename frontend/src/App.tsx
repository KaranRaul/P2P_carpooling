import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers'
import BookRide from './components/BookRide'
import CreateRide from './components/CreateRide'
import Home from './components/Home'

// hardhat.config.js
import config from './config.json'
import Carpool from './abis/Carpool.json'
import MyRide from "./components/MyRide";
import BookedRide from "./components/BookedRides";
function App() {


  const [account, setAccount] = useState<String>();
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [carpool, setCarpool] = useState<ethers.Contract>();
  const [rides, setRides] = useState<any[]>([]);
  // const [provider,setProvider]  = useState(null);
  // const [provider,setProvider]  = useState(null);
  // const [provider,setProvider]  = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    // console.log(provider);
    const network = await provider.getNetwork()
    const signer = await provider.getSigner();
    // console.log(signer)
    // console.log(network);
    setProvider(provider)
    // console.log(Carpool);
    const carpool = new ethers.Contract(config[network.chainId].carpool.address, Carpool, signer)
    // console.log(carpool);
    setCarpool(carpool);
    // setDappazon(dappazon)
  }
  const connect = async () => {
    const accts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accts.length > 0) {
      const acc = ethers.getAddress(accts[0]);
      // console.log(ethers)
      setAccount(acc);
      // console.log(acc);
    } else {
      console.error("No accounts found.");
    }

    const rides = [];


  }
  const fetchRides = async () => {
    if (carpool) {
      // const tx = await carpool.createride("origin", "destination", 10, 20, 1);

      // // Wait for the transaction to be mined
      // await tx.wait();

      console.log('Ride added successfully');
      // Call the contract method to get ride details
      // const rideCount = await carpool.getRideCount();

      // // Loop through each ride and fetch its details
      // const allRides = await carpool.getAllRides();

      // setRides(allRides);
    }
  };
  useEffect(() => {
    // connect();
    loadBlockchainData();
  }, [])

  useEffect(() => {
    if (carpool) {
      fetchRides();
    }
  }, [carpool]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createRide" element={<CreateRide carpool={carpool} />} />
        <Route path="/bookRide" element={<BookRide carpool={carpool} />} />
        <Route path="/myRides" element={<MyRide carpool={carpool} />} />
        <Route path="/bookedRides" element={<BookedRide carpool={carpool} />} />

      </Routes>
    </BrowserRouter >
  )
}

export default App
