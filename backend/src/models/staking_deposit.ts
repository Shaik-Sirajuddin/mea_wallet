import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface StakingDepositAttributes {
  id: number;
  user_id: number;
  plan_id: number;
  amount: string; // DECIMAL as string for precision
  enroll_time: Date;
  close_time: Date | null;
  acc_interest: string | null;
  withdrawn_amount: string | null;
  created_at: Date;
  updated_at: Date;
}

interface StakingDepositCreationAttributes
  extends Optional<
    StakingDepositAttributes,
    | "id"
    | "close_time"
    | "acc_interest"
    | "withdrawn_amount"
    | "created_at"
    | "updated_at"
  > {}

type StakingDepositModel = Model<
  StakingDepositAttributes,
  StakingDepositCreationAttributes
> &
  StakingDepositAttributes;

const StakingDeposit = sequelize.define<StakingDepositModel>(
  "StakingDeposit",
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
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    timestamps: false,
    tableName: "staking_enrollments",
  }
);

export default StakingDeposit;
