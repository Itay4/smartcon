# smartcon

[![pdm-managed](https://img.shields.io/badge/pdm-managed-blueviolet)](https://pdm.fming.dev)


## Prerequisites

1. Install [genash-cli](https://github.com/trufflesuite/ganache-cli)
2. Install [PDM](https://github.com/pdm-project/pdm) and run `pdm sync`

## Usage

To interact with a deployed contract in a local environment, start by opening the console:

```bash
pdm run brownie console
```

Next, deploy a test token:

```python
>>> token = Token.deploy("Test Token", "TST", 18, 1e21, {'from': accounts[0]})

Transaction sent: 0x4a61edfaaa8ba55573603abd35403cf41291eca443c983f85de06e0b119da377
  Gas price: 0.0 gwei   Gas limit: 12000000
  Token.constructor confirmed - Block: 1   Gas used: 521513 (4.35%)
  Token deployed at: 0xd495633B90a237de510B4375c442C0469D3C161C
```

You now have a token contract deployed, with a balance of `1e21` assigned to `accounts[0]`:

```python
>>> token
<Token Contract '0xd495633B90a237de510B4375c442C0469D3C161C'>

>>> token.balanceOf(accounts[0])
1000000000000000000000

>>> token.transfer(accounts[1], 1e18, {'from': accounts[0]})
Transaction sent: 0xb94b219148501a269020158320d543946a4e7b9fac294b17164252a13dce9534
  Gas price: 0.0 gwei   Gas limit: 12000000
  Token.transfer confirmed - Block: 2   Gas used: 51668 (0.43%)

<Transaction '0xb94b219148501a269020158320d543946a4e7b9fac294b17164252a13dce9534'>
```

## Testing

To run the tests:

```bash
pdm run brownie test
```

## pre-commit
We use are using [pre-commit](https://pre-commit.com/):
1. Install hook to be performed as a hook before commit changes - `pre-commit install`
2. In order to run pre-commit without commit- `pre-commit run -a` (on all files), `pre-commit run` (on staged files)