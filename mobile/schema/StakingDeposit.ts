import { StakingPlan } from "./StakingPlan";

export class StakingDeposit {
  id: number;
  user_id: number;
  plan_id: number;
  amount: string;
  enroll_time: Date;
  close_time?: Date | null;
  acc_interest?: string | null;
  withdrawn_amount?: string | null;
  plan: StakingPlan;

  constructor(data: any) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.plan_id = data.plan_id;
    this.amount = data.amount;
    this.enroll_time = new Date(data.enroll_time);
    this.close_time = data.close_time ? new Date(data.close_time) : null;
    this.acc_interest = data.acc_interest ?? null;
    this.withdrawn_amount = data.withdrawn_amount ?? null;
    // optional nested plan (check if present)
    this.plan = new StakingPlan(data.plan);
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      user_id: this.user_id,
      plan_id: this.plan_id,
      amount: this.amount,
      enroll_time: this.enroll_time.toISOString(),
      close_time: this.close_time?.toISOString() ?? null,
      acc_interest: this.acc_interest,
      withdrawn_amount: this.withdrawn_amount,
      plan: this.plan.toJSON(),
    };
  }

  static fromJSON(json: any): StakingDeposit {
    return new StakingDeposit(json);
  }
}
