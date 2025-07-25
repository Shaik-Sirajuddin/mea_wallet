export interface RawLockupHistoryItem {
  regdate: string;
  amount: string;
  sdate: string;
  edate: string;
  state: string;
}

export interface LockupHistoryResponseRaw {
  status: string;
  block_start: number;
  block_end: number;
  block_num: number;
  total_block: number;
  data: RawLockupHistoryItem[];
}

export interface LockupHistoryItem {
  registeredAt: string; // renamed from regdate
  amount: string;
  startDate: Date; // renamed from sdate
  endDate: Date; // renamed from edate
  status: string; // renamed from state
}

export interface LockupHistoryResponse {
  status: string;
  blockStart: number;
  blockEnd: number;
  blockNum: number;
  totalBlock: number;
  items: LockupHistoryItem[];
}
