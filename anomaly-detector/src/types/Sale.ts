export interface Attribute {
  value: string;
  trait_type: string;
}

export interface Metadata {
  image: string;
  attributes: Attribute[];
}

export interface Sale {
  id: string;
  contract: string;
  token_id: string;
  order_source: string;
  fill_source: string;
  order_side: string;
  from_address: string;
  to_address: string;
  amount: string;
  txhash: string;
  timestamp: string;
  sale_price_in_eth: string;
  sale_amount: string;
  sale_asset: string;
  bundle_id: string;
  bundle: boolean;
  block_number: number;
  erc: string;
  metadata: Metadata;
}
