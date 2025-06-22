import { apiBaseUrl } from "@/lib/constants";
import { networkRequest } from ".";
import { StakingPlan } from "@/schema/StakingPlan"; // You must define this
import { StakingDeposit } from "@/schema/StakingDeposit"; // You must define this

const url = apiBaseUrl + "/stake";

export interface EnrollStakePayload {
  plan_id: number;
  amount: number | string;
}

export interface EnrollStakeResponse {
  id: number;
}

export interface CloseStakePayload {
  deposit_id: number;
}

export default {
  /**
   * Get all active staking plans
   */
  getPlans: async () => {
    const response = await networkRequest<object[]>(url + "/plans");
    if (typeof response === "string") return response;
    return response.map((plan) => new StakingPlan(plan));
  },

  /**
   * Get all staking deposits by the user
   */
  getStakes: async () => {
    const response = await networkRequest<object[]>(url + "/stakes");
    if (typeof response === "string") return response;
    return response.map((deposit) => new StakingDeposit(deposit));
  },

  /**
   * Enroll into a staking plan
   */
  enrollStake: async (plan_id: number, amount: string) => {
    return await networkRequest<EnrollStakeResponse>(url + "/enroll-stake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id,
        amount,
      }),
    });
  },

  /**
   * Close a staking deposit
   */
  closeStake: async (deposit_id: number) => {
    return networkRequest<object>(url + "/close-stake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deposit_id,
      }),
    });
  },
};
