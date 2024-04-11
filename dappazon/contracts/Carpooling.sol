// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract carpooling {
    struct user {
        string name;
        uint8 age;
        bool gender; // 0 for female, 1 for male
    }
    struct ride {
        uint rideId;
        string origin;
        string destination;
        uint departuretime;
        uint fare;
        uint seats;
    }
    string public s = "hello";
    mapping(uint => address) public rideowner;
    mapping(uint => mapping(uint => address)) public rideToRider;
    uint8 public ridecount = 0;
    ride[] public rides;
    user[] public person;
    mapping(address => user) public addressDetails;

    event rideCreated(
        uint rideId,
        string origin,
        string destination,
        uint departuretime,
        uint fare,
        uint seats
    );
    event rideBooked(uint rideId, uint seats, address passenger);
    event userCreated(uint index, string name, uint8 age, bool gender);

    function createUser(
        string memory _name,
        uint8 _age,
        bool _gender
    ) public returns (uint) {
        person.push(user(_name, _age, _gender));
        addressDetails[msg.sender] = user(_name, _age, _gender); // Add user details to mapping
        uint index = person.length - 1; // Index of the newly created user
        emit userCreated(index, _name, _age, _gender); // Emit event with user details
        return index;
    }

    function getRideCount() public view returns (uint) {
        return ridecount;
    }

    function getAllRides() public view returns (ride[] memory) {
        return rides;
    }

    function createride(
        string memory _origin,
        string memory _destination,
        uint _departuretime,
        uint _fare,
        uint8 _seats
    ) public {
        rides.push(
            ride(
                ridecount,
                _origin,
                _destination,
                _departuretime,
                _fare,
                _seats
            )
        );
        rideowner[ridecount] = msg.sender;
        emit rideCreated(
            ridecount,
            _origin,
            _destination,
            _departuretime,
            _fare,
            _seats
        );
        ridecount++;
    }

    function bookRide(uint rideId) public {
        rideToRider[rideId][rides[rideId].seats] = msg.sender;
        rides[rideId].seats -= 1;
        emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    }
}
