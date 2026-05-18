---
title: "ERC20, ERC721 tokens and NFTs: technical guide"
description: "Technical guide to Ethereum tokens: ERC20, ERC721, ERC1155 and how to create and manage fungible and non-fungible tokens."
date: "2025-11-10"
tags: ["ERC20", "ERC721", "NFTs", "Tokens", "Ethereum"]
---

## Token standards on Ethereum

Ethereum has token standards defining common interfaces. The most important are ERC20 and ERC721.

## ERC20 (Fungible Tokens)

All tokens are identical and interchangeable. Uses: currencies, utility tokens, stablecoins, governance tokens.

### Main functions

totalSupply(), balanceOf(), transfer(), approve(), and transferFrom(). Events: Transfer and Approval.

## ERC721 (Non-Fungible Tokens - NFTs)

Each token is unique. Uses: digital art, collectibles, real estate, digital identity.

### Metadata

tokenURI() returns JSON with image, name, description, and attributes. Stored on IPFS or Arweave.

## ERC1155 (Multi Token)

Combines fungible and non-fungible in one contract. Reduces gas costs for multiple token types.

## OpenZeppelin

The standard library for implementing tokens. Provides audited, secure contracts.

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

## IPFS for NFTs

Store NFT metadata and media on IPFS. Use Pinata or web3.storage for persistence.

## Conclusion

ERC20 and ERC721 tokens are the foundation of the blockchain economy. At Vynta we develop custom token contracts for DeFi, NFT, and tokenization projects.
