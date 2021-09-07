#!/usr/bin/python3

from brownie import Token, accounts, config


def main():
    acct = accounts.add(
        config["wallets"]["from_key"],
    )
    return Token.deploy("Test Token", "TST", 18, 1e21, {"from": acct})
