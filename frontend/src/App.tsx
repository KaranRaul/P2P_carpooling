
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import './App.css'
import { ethers } from 'ethers'
import BookRide from './components/BookRide'
import CreateRide from './components/CreateRide'
import Home from './components/Home'
// require('dotenv').config();
// hardhat.config.js
// import config from './config.json'
import Carpool from './abis/Carpool.json'
import MyRide from "./components/MyRide";
import BookedRide from "./components/BookedRides";
function App() {
  // console.log(process.env.API_KEY)
  const API_KEY = "WFsQIPw7d0ax-6WLAusXv-zTPsSK9zRF"
  const PRIVATE_KEY = "06bccf5c8966b60ee913589e12244779c0ac594e671cb1653eddbba6ea145723";
  const CONTRACT_ADDRESS = "0x0901645c0f4FA8dBcbA75a9efA93E89d1D3506BC";

  // const [account, setAccount] = useState<String>();
  // const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [carpool, setCarpool] = useState<ethers.Contract>();
  // const [rides, setRides] = useState<any[]>([]);
  // const [provider,setProvider]  = useState(null);
  // const [provider,setProvider]  = useState(null);
  // const [provider,setProvider]  = useState(null);

  const loadBlockchainData = async () => {
    const contract = Carpool;
    // const test = new ethers.AlchemyProvider("ropsten", API_KEY);
    const alchemyProvider = new ethers.AlchemyProvider("sepolia", API_KEY);
    const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
    // console.log(alchemyProvider);
    // console.log(signer);
    const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract, signer);
    // console.log(helloWorldContract);
    // const provider = new ethers.BrowserProvider(window.ethereum)
    // // console.log(provider);
    // const network = await provider.getNetwork()
    // const signer = await provider.getSigner();
    // console.log(signer)
    // console.log(network);
    // setProvider(provider)
    // console.log(Carpool);
    // const carpool = new ethers.Contract(config[network.chainId].carpool.address, Carpool, signer)
    // console.log(carpool);
    setCarpool(helloWorldContract);


    // setDappazon(dappazon)
  }
  // const { ethereum } = window;
  // const test = async () => {
  //   if (ethereum) {
  //     const valInEth = 12; // 4 ETH
  //     const valInWei = ethers.parseEther(valInEth.toString()); // Convert to Wei
  //     const valInHex = '0x' + valInWei.toString(16); // Convert to hexadecimal string

  //     console.log(valInHex);

  //     await ethereum.request({
  //       method: "eth_sendTransaction",
  //       params: [
  //         {
  //           from: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  //           to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //           gas: "0x5208",
  //           value: valInHex,
  //         },
  //       ],
  //     });
  //   }
  // };
  // const connect = async () => {
  //   const accts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   if (accts.length > 0) {
  //     const acc = ethers.getAddress(accts[0]);
  //     // console.log(ethers)
  //     setAccount(acc);
  //     // console.log(acc);
  //   } else {
  //     console.error("No accounts found.");
  //   }

  //   const rides = [];


  // }
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
    // test();
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
        <Route path="/myRides" element={//@ts-ignore 
          <MyRide carpool={carpool} />} />
        <Route path="/bookRide" element={ //@ts-ignore
          <BookRide carpool={carpool} />} />
        <Route path="/bookedRides" element={//@ts-ignore
          <BookedRide carpool={carpool} />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
