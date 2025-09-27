export interface TransferHistoryResponseRaw {
  status: string;
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: TransferHistoryItemRaw[];
}

export interface TransferHistoryItemRaw {
  regdate: string;
  gubn: string;
  amount: string;
  WithdrawFee: string;
  prev_amount: string;
  next_amount: string;
  state: string;
  from_address: string;
  to_address: string;
  hash: string;
  memo: string;
}

export interface TransferHistoryResponse {
  status: string;
  blockStart: number;
  blockEnd: number;
  blockNum: number;
  totalBlock: number;
  items: TransferHistoryItem[];
}

export interface TransferHistoryItem {
  registeredAt: string; // regdate
  type: string; // gubn
  amount: string;
  withdrawFee: string;
  previousBalance: string;
  nextBalance: string;
  status: string;
}
