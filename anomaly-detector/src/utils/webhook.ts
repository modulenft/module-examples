import nodeFetch from "node-fetch";
import { Fulltx } from "../types/Fulltx";
import { Sale } from "../types/Sale";

export const webhook = async (data: Sale | Fulltx, type) => {
  try {
    const options = {
      headers: {
        "content-type": "application/json",
        "X-API-KEY": process.env.API_KEY,
      },
      method: "POST",
      body: JSON.stringify(buildWebhook(data, type)),
    };

    await nodeFetch(process.env.WEBHOOK_URL, options);
  } catch (error) {
    console.log(error);
  }
};

const buildWebhook = (data: any, type) => {
  const webhookData = {
    content: null,
    embeds: [
      {
        title: "Anomaly Detected - Large ETH Transfer",
        color: 14406911,
        fields: [{}],
        footer: {
          text: "Module Anomaly Watcher",
          icon_url:
            "https://pbs.twimg.com/profile_images/1526944166571294725/xxc10_jU_400x400.jpg",
        },
        timestamp: "2022-10-25T15:01:00.000Z",
      },
    ],
    attachments: [],
  };

  switch (type) {
    case "sale":
      webhookData.embeds[0].title = "Anomaly Detected - Large NFT Sale";
      webhookData.embeds[0].fields = [
        {
          name: "Seller",
          value: data.from_address,
          inline: true,
        },
        {
          name: "Buyer",
          value: data.to_address,
          inline: true,
        },
        {
          name: "Sale Price",
          value: `${data.sale_price_in_eth} ETH`,
          inline: true,
        },
        {
          name: "Collection",

          value: data.contract,
          inline: true,
        },
        {
          name: "Token ID",
          value: data.token_id,
          inline: true,
        },
        {
          name: "Marketplace",
          value: data.order_source,
          inline: true,
        },
        {
          name: "Transaction Hash",
          value: `[TX](https://etherscan.io/tx/${data.txhash})`,
          inline: true,
        },
      ];

      break;
    case "transfer":
      webhookData.embeds[0].fields = [
        {
          name: "From",
          value: data.fromAddress,
          inline: true,
        },
        {
          name: "To",
          value: data.toAddress,
          inline: true,
        },
        {
          name: "Amount",
          value: `${data.value / 10 ** 18} ETH`,
          inline: true,
        },
        {
          name: "TX",
          value: `[TX](https://etherscan.io/tx/${data.transactionHash})`,
          inline: true,
        },
      ];
      break;
  }

  return webhookData;
};
