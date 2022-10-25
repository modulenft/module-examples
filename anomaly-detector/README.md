# Anomaly Detector

## Whats this?

This is a simple monitor that watches for abnormalities on Ethereum mainnet via the [Module API](https://module.readme.io/reference/about).

This is a work in progress, and currently monitors:

-   Large NFT Sales (> 100 ETH)
-   Large ETH Transfers (> 1000 ETH)

## How to use

1.  Clone this repo
2.  `yarn install`
3.  edit .env file with your own module api key and webhook url

```
WEBHOOK_URL=https://discord.com/api/webhooks/...
MODULE_API_KEY=...
```

4. `yarn build`
5. `yarn start`

Contributions welcome!
