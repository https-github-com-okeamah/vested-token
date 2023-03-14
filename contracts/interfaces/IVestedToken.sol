// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;


interface IVestedToken {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function owner() external view returns (address);
    function transferOwnership(address newOwner) external;
    function registerVestings(address[] calldata vestings) external;
    function deregisterVestings(address[] calldata vestings) external;
}
