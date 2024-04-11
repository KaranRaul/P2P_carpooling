const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}



// describe('signer', () => {
//   let deployer, buyer;
//   let carpool;

//   it('has deploye and buyer', async () => {
//     [deployer, buyer] = await ethers.getSigners();
//     console.log(deployer.address, buyer.address);

//   })
// });
// describe("rpooling", () => {
//   it('has a name', async () => {
//     const Carpool = await ethers.getContractFactory("carpooling");
//     carpool = await Carpool.deploy();
//     const name = await carpool.s();
//     expect(name).to.equal("hello");

//   });
// })
describe("createAndBookRide", () => {
  it('creates and books a ride', async () => {
    const Carpool = await ethers.getContractFactory("carpooling");
    carpool = await Carpool.deploy();

    // User details
    const userName = "Alice";
    const userAge = 30;
    const userGender = false; // 0 for female

    // Create a new user
    await carpool.newUser(userName, userAge, userGender);

    // Rider details
    const rideOrigin = "Origin";
    const rideDestination = "Destination";
    const rideDepartureTime = 1648888800; // Unix timestamp for a future date
    const rideFare = 10; // Example fare
    const rideSeats = 3; // Example number of seats

    // Create a new ride
    await carpool.createride(rideOrigin, rideDestination, rideDepartureTime, rideFare, rideSeats);

    // Retrieve the ride count
    const rideCount = await carpool.ridecount();
    //test
    // Book a ride
    await carpool.bookRide(rideCount - 1); // Book a seat in the last created ride
    //test
    // Retrieve booked ride details
    const bookedRide = await carpool.rides(rideCount - 1);
    console.log(bookedRide);

    // Check if the number of seats available has decreased by 1
    expect(bookedRide.seats).to.equal(rideSeats - 1);

    // Check if the booking is associated with the user who booked it
    const bookedRider = await carpool.rideToRider(rideCount - 1, rideSeats - 1);
    // Get the address of the signer
    const signerAddress = (await ethers.getSigners())[0].address;
    // expect(bookedRider).to.equal(signerAddress); // Compare with the signer's address
  });
});


// describe("createUser", () => {
//   it('creates a new user', async () => {
//     const Carpool = await ethers.getContractFactory("carpooling");
//     carpool = await Carpool.deploy();

//     // User details
//     const name = "Alice";
//     const age = 30;
//     const gender = false; // 0 for female

//     // Create a new user
//     await carpool.newUser(name, age, gender);

//     // Retrieve user details from the contract
//     const user = await carpool.addressDetails(await ethers.provider.getSigner().getAddress());

//     // Check if the user details match the expected values
//     expect(user.name).to.equal("hh");
//     expect(user.age).to.equal(age);
//     expect(user.gender).to.equal(gender);
//   });
// });

