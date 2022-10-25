// This detects large ethereum transfers and sends them to the webhook
import { Sale } from "../types/Sale";
import { fetch } from "../utils/fetch";
import log from "../utils/log";
import { webhook } from "../utils/webhook";

let old: string[] = [];
const monitor = async () => {
  log("Monitoring for large NFT Sales...", 2);
  const response = await fetch(
    `https://api.modulenft.xyz/api/v2/eth/nft/sales?count=5&offset=0&sortDirection=timeDesc&minPrice=100&withMetadata=false`
  );

  if (response.status != 200) {
    return;
  }

  const sales = await response.json();

  if (old.length === 0) {
    old = sales.data.map((sale: Sale) => sale.id);
  }

  sales.data = sales.data.filter((sale: Sale) => {
    if (old.includes(sale.id)) {
      return false;
    }
    old.push(sale.id);
    return true;
  });

  sales.data.forEach(async (sale: any) => {
    log(`Sending webhook for ${sale.txhash}`, 2);
    webhook(sale, "sale");
  });
};

setInterval(monitor, 2000);
