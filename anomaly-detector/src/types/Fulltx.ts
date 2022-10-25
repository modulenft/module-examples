export interface Fulltx {
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  contractAddress?: any;
  cumulativeGasUsed: number;
  fromAddress: string;
  gasUsed: number;
  logs: any[];
  logsBloom: string;
  status: string;
  toAddress: string;
  transactionIndex: number;
  txType: number;
  hash: string;
  accessList: any[];
  chainId: number;
  gas: number;
  gasPrice: number;
  input: string;
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
  nonce: number;
  r: string;
  s: string;
  v: number;
  value: number;
}
