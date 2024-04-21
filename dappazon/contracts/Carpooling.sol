// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract carpooling {
    struct user {
        int userId;
        string name;
        uint8 age;
        bool gender; // 0 for female, 1 for male
    }

    struct driver {
        uint driverId;
        string name;
        uint phoneNo;
        string accAddress;
    }

    int userCnt = 0;
    uint driverCnt = 0;
    struct ride {
        uint rideId;
        uint driverId;
        int userId;
        string origin;
        string destination;
        uint departuretime;
        uint fare;
        uint seats;
        bool isComplete;
        uint approxReachTime;
        string accAddress;
    }

    int unbooked_ride = -1;
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
        uint approxReachTime,
        string accAddress
    );
    event rideBooked(uint rideId, uint seats, address passenger);
    event userCreated(uint index, string name, uint8 age, bool gender);

    function createDriver(
        string memory _name,
        string memory _accAddress,
        uint phoneNo
    ) public returns (uint) {
        drivers.push(driver(driverCnt, _name, phoneNo, _accAddress));
        driverCnt++;
        return driverCnt - 1;
    }
    function getDriverAddress(
        uint driverId
    ) public view returns (string memory) {
        // require(driverId <= driverCnt, "Driver does not exist");
        return drivers[driverId].accAddress;
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
    ) public returns (int) {
        person.push(user(userCnt, _name, _age, _gender));
        // addressDetails[msg.sender] = user(_name, _age, _gender); // Add user details to mapping
        int index = userCnt; // Index of the newly created user
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

    function getUserCnt() public view returns (int) {
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
        bool _isComplete,
        string memory _accAddress
    ) public {
        rides.push(
            ride(
                ridecount,
                _driverId,
                -1,
                _origin,
                _destination,
                _departuretime,
                _fare,
                _seats,
                _isComplete,
                _approxTime,
                _accAddress
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
            _approxTime,
            _accAddress
        );
        ridecount++;
    }

    function completeRide(uint _rideId) public {
        require(
            msg.sender == rideowner[_rideId],
            "Only the ride owner can complete the ride"
        );
        rides[_rideId].isComplete = true;
    }

    function bookRide(uint rideId, int _userId) public {
        require(_userId >= 0, "Invalid userId");

        // Update the userId in the ride struct
        rides[rideId].userId = int(_userId);

        emit rideBooked(rideId, rides[rideId].seats, msg.sender);
    }
}
