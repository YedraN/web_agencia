---
title: "Tokens ERC20, ERC721 y NFTs: guía técnica"
description: "Guía técnica de tokens en Ethereum: ERC20, ERC721, ERC1155 y cómo crear y gestionar tokens fungibles y no fungibles."
date: "2025-11-10"
tags: ["ERC20", "ERC721", "NFTs", "Tokens", "Ethereum"]
---

## Tipos de tokens en Ethereum

Ethereum tiene estándares de tokens que definen interfaces comunes. Los más importantes son ERC20 y ERC721.

## ERC20 (Tokens Fungibles)

Todos los tokens son iguales e intercambiables. Usos: monedas, utility tokens, stablecoins, governance tokens.

### Funciones principales

totalSupply(), balanceOf(), transfer(), approve() y transferFrom(). Eventos Transfer y Approval.

## ERC721 (Tokens No Fungibles - NFTs)

Cada token es único. Usos: arte digital, coleccionables, propiedades inmobiliarias, identidad digital.

### Metadatos

tokenURI() devuelve un JSON con imagen, nombre, descripción y atributos. Almacenado en IPFS o Arweave.

## ERC1155 (Multi Token)

Combina fungible y no fungible en un solo contrato. Reduce costes de gas para múltiples tipos de tokens.

## OpenZeppelin

La biblioteca estándar para implementar tokens. Proporciona contratos auditados y seguros.

```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

## IPFS para NFTs

Almacena metadatos y media de NFTs en IPFS. Usa Pinata o web3.storage para persistencia.

## Conclusión

Los tokens ERC20 y ERC721 son la base de la economía blockchain. En Vynta desarrollamos contratos de token personalizados para proyectos DeFi, NFTs y tokenización.
