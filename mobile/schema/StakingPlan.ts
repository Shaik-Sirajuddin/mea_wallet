export class StakingPlan {
  id: number;
  tokenId: number;
  lockDays: number;
  apy: number;
  min_deposit: number;
  max_deposit: number;
  earlyPenaltyPercent: number;
  paused: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.tokenId = data.tokenId;
    this.lockDays = data.lockDays;
    this.apy = data.apy;
    this.min_deposit = data.min_deposit;
    this.max_deposit = data.max_deposit;
    this.earlyPenaltyPercent = data.earlyPenaltyPercent;
    this.paused = data.paused;
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      tokenId: this.tokenId,
      lockDays: this.lockDays,
      apy: this.apy,
      min_deposit: this.min_deposit,
      max_deposit: this.max_deposit,
      earlyPenaltyPercent: this.earlyPenaltyPercent,
      paused: this.paused,
    };
  }

  static fromJSON(json: any): StakingPlan {
    return new StakingPlan(json);
  }
}
