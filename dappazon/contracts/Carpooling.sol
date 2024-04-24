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
        bool payment; // New field for payment status
    }

    int userCnt = 0;
    uint driverCnt = 0;
    int rideCnt = 0;
    string public s = "hello";
    mapping(uint => address) public rideowner;
    mapping(uint => mapping(uint => address)) public rideToRider;
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
        string accAddress,
        bool payment
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
        return drivers[driverId].accAddress;
    }

    function getDriver(uint index) public view returns (driver memory) {
        return drivers[index];
    }

    function createUser(
        string memory _name,
        uint8 _age,
        bool _gender
    ) public returns (int) {
        person.push(user(userCnt, _name, _age, _gender));
        int index = userCnt;
        userCnt += 1;
        return index;
    }

    function getRideCount() public view returns (uint) {
        return rides.length;
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
        uint _seats,
        uint _driverId,
        uint _userId,
        uint _approxTime,
        bool _isComplete,
        string memory _accAddress
    ) public {
        rides.push(
            ride(
                uint(rideCnt),
                _driverId,
                int(-1),
                _origin,
                _destination,
                _departuretime,
                _fare,
                _seats,
                _isComplete,
                _approxTime,
                _accAddress,
                false // Set payment to false initially
            )
        );
        rideowner[uint(rideCnt)] = msg.sender;
        emit rideCreated(
            uint(rideCnt),
            _driverId,
            _userId,
            _origin,
            _destination,
            _departuretime,
            _fare,
            _seats,
            _isComplete,
            _approxTime,
            _accAddress,
            false // Emit payment status as false initially
        );
        rideCnt++;
    }

    function completeRide(uint _rideId) public {
        require(
            msg.sender == rideowner[_rideId],
            "Only the ride owner can complete the ride"
        );
        rides[_rideId].isComplete = true;
    }

    function bookRide(uint _rideId, int _userId) public {
        require(_userId >= 0, "Invalid userId");
        rides[_rideId].userId = _userId;
        emit rideBooked(_rideId, rides[_rideId].seats, msg.sender);
    }

    function updatePaymentStatus(uint _rideId) public {
        require(_rideId < rides.length, "Invalid rideId");
        require(
            rideowner[_rideId] == msg.sender,
            "Only the ride owner can update payment status"
        );
        rides[_rideId].payment = true;
    }
}
