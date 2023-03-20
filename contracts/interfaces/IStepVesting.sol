// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface IStepVesting {
    function receiver() external view returns (address);
    function claim() external;
    function started() external view returns (uint256);
    function cliffDuration() external view returns (uint256);
    function cliffAmount() external view returns (uint256);
    function stepDuration() external view returns (uint256);
    function stepAmount() external view returns (uint256);
    function numOfSteps() external view returns (uint256);
    function claimed() external view returns (uint256);
}
