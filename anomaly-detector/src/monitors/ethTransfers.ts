// This detects large ethereum transfers and sends them to the webhook
import { Fulltx } from "../types/Fulltx";
import { fetch } from "../utils/fetch";
import log from "../utils/log";
import { webhook } from "../utils/webhook";

let old: string[] = [];
const monitor = async () => {
  log("Monitoring for large ETH transfers...", 2);
  const response = await fetch(`https://api.modulenft.xyz/api/v2/eth/fulltx`);

  if (response.status != 200) {
    return;
  }

  const data = await response.json();

  let largeTransfers = data.data.filter((tx: Fulltx) => {
    return tx.value > 1000000000000000000000; // 1000 ETH
  });

  if (old.length === 0) {
    old = largeTransfers.map((tx: Fulltx) => tx.transactionHash);
  }

  largeTransfers = largeTransfers.filter((tx: Fulltx) => {
    if (old.includes(tx.transactionHash)) {
      return false;
    }
    old.push(tx.transactionHash);
    return true;
  });

  if (largeTransfers.length < 1) {
    return;
  }

  log(`Found ${largeTransfers.length} large ETH transfers`, 2);
  largeTransfers.forEach(async (tx: any) => {
    log(`Sending webhook for ${tx.transactionHash}`, 2);
    webhook(tx, "transfer");
  });
};

setInterval(monitor, 2000);
