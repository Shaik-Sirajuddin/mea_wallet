import StakingDeposit from "../models/staking_deposit";
import StakingPlan from "../models/staking_plan";

async function defineAssoiciations() {
  StakingDeposit.belongsTo(StakingPlan, {
    foreignKey: "plan_id",
  });
}
