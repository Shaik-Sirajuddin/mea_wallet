import StakingDeposit from "../models/staking_deposit";
import StakingPlan from "../models/staking_plan";
import Token from "../models/token";
import UserBalance from "../models/user_balance";

export async function defineAssoiciations() {
  StakingDeposit.belongsTo(StakingPlan, {
    foreignKey: "plan_id",
    as: "plan",
  });
  StakingPlan.hasMany(StakingDeposit, {
    foreignKey: "plan_id",
  });
  UserBalance.belongsTo(Token, {
    foreignKey: "tokenId",
    as: "token",
  });
}
