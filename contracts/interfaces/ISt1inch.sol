// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

interface ISt1inch {
    function expBase() external view returns (uint256);
    function origin() external view returns (uint256);
}
