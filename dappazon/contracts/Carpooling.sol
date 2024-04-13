// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract carpooling {
    struct user {
        uint userId;
        string name;
        uint8 age;
        bool gender; // 0 for female, 1 for male
    }

    struct driver {
        uint driverId;
        string name;
        uint phoneNo;
    }
    uint userCnt = 0;
    uint driverCnt = 0;
    struct ride {
        uint rideId;
        uint driverId;
        uint userId;
        string origin;
        string destination;
        uint departuretime;
        uint fare;
        uint seats;
        bool isComplete;
        uint approxReachTime;
    }
    string public s = "hello";
    mapping(uint => address) public rideowner;
    mapping(uint => mapping(uint => address)) public rideToRider;
    uint8 public ridecount = 0;
    ride[] public rides;
    user[] public person;
    driver[] public drivers;
    mapping(address => user) public addressDetails;

    event rideCreated(
        uint rideId,
        uint driverId,
        uint userId,
        string origin,
        string destination,
        uint departuretime,
        uint fare,
        uint seats,
        bool isComplete,
        uint approxReachTime
    );
    event rideBooked(uint rideId, uint seats, address passenger);
    event userCreated(uint index, string name, uint8 age, bool gender);

    function createDriver(
        string memory _name,
        uint phoneNo
    ) public returns (uint) {
        drivers.push(driver(driverCnt, _name, phoneNo));
        driverCnt++;
        return driverCnt - 1;
    }

    function getDriver(uint index) public returns (driver memory) {
        return drivers[index];
    }

    function getUser(uint index) public returns (user memory) {
        return person[index];
    }

    function createUser(
        string memory _name,
        uint8 _age,
        bool _gender
    ) public returns (uint) {
        person.push(user(userCnt, _name, _age, _gender));
        // addressDetails[msg.sender] = user(_name, _age, _gender); // Add user details to mapping
        uint index = userCnt; // Index of the newly created user
        userCnt += 1;
        // emit userCreated(index, _name, _age, _gender); // Emit event with user details
        return index;
    }

    function getRideCount() public view returns (uint) {
        return ridecount;
    }

    function getDriverCnt() public view returns (uint) {
        return driverCnt;
    }

    function getUserCnt() public view returns (uint) {
        return userCnt;
    }

    function getAllRides() public view returns (ride[] memory) {
        return rides;
    }

    function createride(
        string memory _origin,
        string memory _destination,
        uint _departuretime,
        uint _fare,
        uint8 _seats,
        uint _driverId,
        uint _userId,
        uint _approxTime,
        bool _isComplete
    ) public {
        rides.push(
            ride(
                ridecount,
                _driverId,
                _userId,
                _origin,
                _destination,
                _departuretime,
                _fare,
                _seats,
                _isComplete,
                _approxTime
            )
        );
        rideowner[ridecount] = msg.sender;
        emit rideCreated(
            ridecount,
            _driverId,
            _userId,
            _origin,
            _destination,
            _departuretime,
            _fare,
            _seats,
            _isComplete,
            _approxTime
        );
        ridecount++;
    }
    function bookRide(uint rideId, uint _userId) public {
        require(_userId >= 0, "Invalid userId");

        // Update the userId in the ride struct
        rides[rideId].userId = _userId;

        // Update any other necessary information

        // Emit the event
        emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    }

    // function bookRide(uint rideId) public {
    //     rideToRider[rideId][rides[rideId].seats] = msg.sender;
    //     rides[rideId].seats -= 1;
    //     emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    // }
}
// pragma solidity ^0.8.9;

// contract carpooling {
//     struct user {
//         string name;
//         uint8 age;
//         bool gender; // 0 for female, 1 for male
//     }
//     struct ride {
//         uint rideId;
//         string origin;
//         string destination;
//         uint departuretime;
//         uint fare;
//         uint seats;
//     }
//     string public s = "hello";
//     // mapping(uint => address) public rideowner;
//     // mapping(uint => mapping(uint => address)) public rideToRider;
//     uint8 public ridecount = 0;
//     ride[] public rides;
//     user[] public person;
//     mapping(address => user) public addressDetails;

//     event rideCreated(
//         uint rideId,
//         string origin,
//         string destination,
//         uint departuretime,
//         uint fare,
//         uint seats
//     );
//     event rideBooked(uint rideId, uint seats, address passenger);
//     event userCreated(uint index, string name, uint8 age, bool gender);

//     function createUser(
//         string memory _name,
//         uint8 _age,
//         bool _gender
//     ) public returns (uint) {
//         person.push(user(_name, _age, _gender));
//         addressDetails[msg.sender] = user(_name, _age, _gender); // Add user details to mapping
//         uint index = person.length - 1; // Index of the newly created user
//         emit userCreated(index, _name, _age, _gender); // Emit event with user details
//         return index;
//     }
//     function getUsers() public view returns (user[] memory) {
//         return person;
//     }
//     // function getUsers() public view returns (user[] memory) {
//     //     user[] memory allUsers = new user[](person.length);
//     //     for (uint i = 0; i < person.length; i++) {
//     //         allUsers[i] = person[i];
//     //     }
//     //     return allUsers;
//     // }
//     function getRideCount() public view returns (uint) {
//         return ridecount;
//     }

//     function getAllRides() public view returns (ride[] memory) {
//         return rides;
//     }

//     function createride(
//         string memory _origin,
//         string memory _destination,
//         uint _departuretime,
//         uint _fare,
//         uint8 _seats
//     ) public {
//         rides.push(
//             ride(
//                 ridecount,
//                 _origin,
//                 _destination,
//                 _departuretime,
//                 _fare,
//                 _seats
//             )
//         );
//         // rideowner[ridecount] = msg.sender;
//         emit rideCreated(
//             ridecount,
//             _origin,
//             _destination,
//             _departuretime,
//             _fare,
//             _seats
//         );
//         ridecount++;
//     }

//     function bookRide(uint rideId) public {
//         // rideToRider[rideId][rides[rideId].seats] = msg.sender;
//         rides[rideId].seats -= 1;
//         emit rideBooked(rideId, rides[rideId].seats, msg.sender);
//     }
// }
