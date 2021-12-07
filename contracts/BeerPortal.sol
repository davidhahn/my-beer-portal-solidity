// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BeerPortal {
    uint256 totalBeer;

    constructor() {
        console.log(unicode"🍺🍻, I am a contract and I am smart");
    }

    function receiveBeer() public {
        totalBeer += 1;
        console.log("%s has given you beer", msg.sender);
    }

    function getTotalBeer() public view returns (uint256) {
        console.log("We have %d total beer", totalBeer);
        return totalBeer;
    }
}
