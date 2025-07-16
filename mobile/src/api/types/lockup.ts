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
  startDate: string; // renamed from sdate
  endDate: string; // renamed from edate
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
