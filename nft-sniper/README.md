## NFT Sniper

### What is this?

- This is a bot that snipes NFTs on OpenSea. It is written in pure JS and uses the [Seaport SDK](https://github.com/ProjectOpenSea/seaport-js) to generate calldata, and the [Module API](https://module.readme.io/reference/retrieve-listings) to find NFTs to snipe.
- This is a proof of concept and is not intended for production use. We are not responsible for any losses you may incur.

### How do I use it?

- Clone the repo
- Install dependencies with `yarn install`

- Create a `.env` file in the root directory and fill it out with the following:

```
## Bot Configuration

# RPC URL from node
RPC_URL=""

# Address of account to use for transactions
ACCOUNT_ADDRESS=""

# Private key of account to use for transactions (without 0x prefix)
PRIVATE_KEY=""

# Seaport contract address (mainnet)
SEAPORT_CONTRACT_ADDRESS="0x00000000006c3852cbef3e08e8df289169ede581"

# Module API key (https://modulenft.xyz)
MODULE_API_KEY=""


## Sniping Criteria

# The minimum price of the NFT you want to buy (in ETH)
MAX_PRICE=1

# The contract address of the NFT you want to buy
NFT_CONTRACT_ADDRESS="0x495f947276749ce646f68ac8c248420045cb7b5e"
```

- Run the bot with `yarn start`
- The bot will automatically snipe the NFT when it is listed for sale!
