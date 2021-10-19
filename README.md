# smartcon

[![pdm-managed](https://img.shields.io/badge/pdm-managed-blueviolet)](https://pdm.fming.dev)


## Prerequisites

1. Install [genash-cli](https://github.com/trufflesuite/ganache-cli)
2. Install [PDM](https://github.com/pdm-project/pdm) and run `pdm sync`
3. If you want to be able to deploy to testnets, do the following:

    Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

    You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. At the moment, it does need to be infura with brownie. If you get lost, follow the instructions at https://ethereumico.io/knowledge-base/infura-api-key-guide/. You can find your PRIVATE_KEY from your ethereum wallet like metamask.

    You'll also need testnet ETH. You can get ETH into your wallet by using the faucet for the appropriate
    testnet.
    For Kovan, available faucets:
     - https://linkfaucet.protofire.io/kovan
     - https://ethdrop.dev

    You can add your environment variables to a .env file. You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'. 

    Here is what your .env should look like:

    ```bash
    export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
    export PRIVATE_KEY=<PRIVATE_KEY>
    ```

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

## Deploying to a Live Network

Assuming you followed step 3 in the prerequisites, then:

```bash
pdm run brownie run deploy --network kovan
```

## Testing

To run the tests:

```bash
pdm run brownie test
```

## pre-commit
We are using [pre-commit](https://pre-commit.com/):
1. Install hook to be performed as a hook before commit changes - `pre-commit install`
2. In order to run pre-commit without commit- `pre-commit run -a` (on all files), `pre-commit run` (on staged files)
