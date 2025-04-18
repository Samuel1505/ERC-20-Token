# ERC20 Token Smart Contract

## Overview
This ERC20 smart contract is a basic implementation of a fungible token on the Ethereum blockchain. It follows the ERC20 standard, allowing users to transfer tokens, approve allowances, and check balances.

## Features
- **Token Transfers**: Users can transfer tokens between addresses.
- **Allowance Mechanism**: Users can approve others to spend tokens on their behalf.
- **Standard ERC20 Events**: Includes `Transfer` and `Approval` events.

## Contract Details
### Constructor
The contract initializes with the following parameters:
- `name` - The token name (e.g., "MyToken").
- `symbol` - The token symbol (e.g., "MTK").
- `decimals` - Number of decimal places (usually 18 for ERC20 tokens).
- `totalSupply` - The total token supply, assigned to the contract owner.

### Functions
#### 1. `balanceOf(address _owner) → uint256`
Returns the balance of a specific address.

#### 2. `transfer(address _to, uint256 _value) → bool`
Transfers `_value` tokens to the `_to` address. Emits a `Transfer` event.

#### 3. `approve(address _spender, uint256 _value) → bool`
Approves `_spender` to spend `_value` tokens on behalf of the caller. Emits an `Approval` event.

#### 4. `allowance(address _owner, address _spender) → uint256`
Returns the remaining tokens `_spender` is allowed to spend on behalf of `_owner`.

#### 5. `transferFrom(address _from, address _to, uint256 _value) → bool`
Allows a spender to transfer tokens from `_from` to `_to`, if they have been approved. Emits a `Transfer` event.

## Deployment Instructions
1. Deploy the contract on Ethereum using Remix, Hardhat, or Truffle.
2. Provide the token name, symbol, decimals, and total supply in the constructor.
3. Verify the contract on Etherscan (if applicable).

## Security Considerations
- **Reentrancy Protection**: This contract does not include reentrancy guards. Consider using OpenZeppelin’s `ReentrancyGuard` if needed.
- **Allowance Risks**: Users should be cautious when approving large amounts, as attackers may exploit old approvals.
- **Ownership Management**: The owner initially holds all tokens. Consider adding a mechanism for distribution.

## License
This project is licensed under the **MIT License**.

