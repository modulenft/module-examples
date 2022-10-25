// In pure JS for simplicity

const fetch = require("node-fetch");
const { Seaport } = require("@opensea/seaport-js");
const { ethers } = require("ethers");
const Web3 = require("web3");
const EthereumTx = require("ethereumjs-tx").Transaction;
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const seaport = new Seaport(provider);

let generateOSCalldata = async (orderData) => {
  let tx = await seaport.fulfillOrder({
    order: orderData,
    accountAddress: process.env.ACCOUNT_ADDRESS,
  });

  // Get calldata from generated transaction by seaport
  let calldata = (await tx.actions[0].transactionMethods.buildTransaction())
    .data;

  if (!calldata) {
    return false;
  }

  return calldata;
};

let monitorCollection = async () => {
  // Uses the Module API to monitor a collection for new listings that match the criteria
  let params = {
    active: true,
    count: 100,
    contractAddress: process.env.NFT_CONTRACT_ADDRESS,
    marketplace: "Opensea",
  };

  let response = await fetch(
    `https://api.modulenft.xyz/api/v2/eth/nft/listings?${new URLSearchParams(
      params
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.MODULE_API_KEY,
      },
    }
  );

  if (response.status !== 200) {
    return false;
  }

  let listings = await response.json();

  let listingsThatFitCriteria = listings.data.filter((listing) => {
    return (
      listing.price <= (process.env.MAX_PRICE * 10 ** 18).toString() &&
      listing.contractAddress === process.env.NFT_CONTRACT_ADDRESS
    );
  });

  if (listingsThatFitCriteria.length === 0) {
    console.log("No listings that fit criteria");
    return;
  }

  return listingsThatFitCriteria[0];
};

let submitTransaction = async (calldata, price) => {
  console.log("Creating transaction");

  let nonce = await provider.getTransactionCount(process.env.ACCOUNT_ADDRESS);
  let gwei = await web3.eth.getGasPrice();
  const txData = {
    nonce: web3.utils.toHex(nonce),
    gasLimit: web3.utils.toHex(200000),
    gasPrice: web3.utils.toHex(gwei),
    to: process.env.SEAPORT_CONTRACT_ADDRESS,
    from: process.env.ACCOUNT_ADDRESS,
    value: web3.utils.toHex(price),
    data: calldata,
  };

  const transaction = new EthereumTx(txData, {
    chain: "mainnet",
  });

  // Remove 0x from private key in .env file
  transaction.sign(new Buffer.from(process.env.PRIVATE_KEY, "hex"));

  let serializedTx = "0x" + transaction.serialize().toString("hex");

  console.log("Submitting transaction");
  let response = await provider.sendTransaction(serializedTx);
  console.log("Submitted transaction. Waiting for confirmation");

  let txHash = response.hash;
  console.log("Waiting for transaction to be mined: " + txHash);
  let receipt = await provider.waitForTransaction(txHash);

  if (receipt.status === 1) {
    console.log("Transaction mined");
  } else {
    console.log("Transaction failed");
  }

  return;
};

let main = async () => {
  console.log("Starting bot");
  let listing = await monitorCollection();

  if (!listing) {
    setTimeout(() => {
      main();

      // 3 second delay. Tune this to your liking / rate limits
    }, 3000);
    return;
  }

  let calldata = await generateOSCalldata(listing.orderData);

  if (!calldata) {
    setTimeout(() => {
      main();
      // 3 second delay. Tune this to your liking / rate limits
    }, 3000);
    return;
  }

  submitTransaction(calldata, listing.price);
};

main();
