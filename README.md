# VestedToken

A synthetic non-transferrable token contract designed to manage the vesting of tokens, allowing you to track the balances of receivers. This contract supports configurable vesting schedules, cliff durations, and token distributions.

### Features:
- Secure token vesting management
- Configurable vesting schedules
- Supports token beneficiaries with specified cliff durations

[![Build Status](https://github.com/okeamah/vested-token/workflows/CI/badge.svg)](https://github.com/okeamah/vested-token/actions)  
[![Coverage Status](https://coveralls.io/repos/github/okeamah/vested-token/badge.svg?branch=master)](https://coveralls.io/github/okeamah/vested-token?branch=master)

### Installation
- Install dependencies: `npm install`
- Run tests: `npx hardhat test`

### Deployment
Deploy using Hardhat:
```bash
npx hardhat run scripts/deploy.js --network <network_name>
