import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";
import StakingPlan from "./staking_plan";

class StakingDeposit extends Model<
  InferAttributes<StakingDeposit>,
  InferCreationAttributes<StakingDeposit>
> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare plan_id: number;
  declare amount: string;
  declare enroll_time: Date;
  declare close_time: CreationOptional<Date | null>;
  declare acc_interest: CreationOptional<string | null>;
  declare withdrawn_amount: CreationOptional<string | null>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare plan?: NonAttribute<StakingPlan>;
}

StakingDeposit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    enroll_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    close_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    acc_interest: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: true,
      defaultValue: null,
    },
    withdrawn_amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default StakingDeposit;
