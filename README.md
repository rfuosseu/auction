# Overview

This is a quick REST API to test Kata - Vickrey Auction

# Intallation

1.  Clone the repository
2.  Install node@16
3.  Install the dependancies `npm install`
4.  `npm start` to run the server

# Endpoint

To emulate the auction, use this endpoint

```
POST http://localhost:9000/results
{
    item: { reservePrice: number; name: string };
    bidders: { name: string; bids: number[] }[];
}
```

Response format:

```
{
      winner: string|undefined;
      price: number;
}
```

# Usefull commands

- `npm run lint`: check and correct when possible coding style
- `npm run test:unit`: launch unit tests
- `npm run test:e2e`: launch end-to-end tests
