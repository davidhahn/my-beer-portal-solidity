// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BeerPortal {
    uint256 totalBeer;
    uint256 private seed;

    event NewBeer(address indexed from, string message, uint256 timestamp);

    struct Beer {
        address bartender; // address of the person who sent the beer
        string message;
        uint256 timestamp;
    }

    Beer[] beers; // Array of Beer struct called beers

    mapping(address => uint256) public lastBeeredAt;

    constructor() payable {
        console.log(unicode"🍺🍻, I am a contract and I am smart");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function receiveBeer(string memory _message) public {
        require(
            lastBeeredAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15 minutes"
        );
        lastBeeredAt[msg.sender] = block.timestamp;

        totalBeer += 1;
        console.log(
            "%s has given you beer with message %s",
            msg.sender,
            _message
        );

        beers.push(Beer(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);

        if (seed <= 50) {
            uint256 beerMoney = 0.0001 ether;
            require(
                beerMoney <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: beerMoney}("");
            require(success, "Failed to withdraw beer money from contract.");
        }

        emit NewBeer(msg.sender, _message, block.timestamp);
    }

    function getAllBeers() public view returns (Beer[] memory) {
        return beers;
    }

    function getTotalBeers() public view returns (uint256) {
        console.log("We have %d total beer", totalBeer);
        return totalBeer;
    }
}
