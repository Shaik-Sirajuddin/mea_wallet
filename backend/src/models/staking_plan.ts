import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

class StakingPlan extends Model {
  declare id: number;
  tokenId: number;
  lockDays: number;
  apy: number;
  min_deposit: number;
  max_deposit: number;

  //penalty in percentage
  earlyPenaltyPercent: number;
  paused: boolean;
  declare created_at: Date;
  declare updated_at: Date;
}

StakingPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lockDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apy: {
      type: DataTypes.DECIMAL(5, 2), // For example: 12.50% APY
      allowNull: false,
    },
    min_deposit: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: 1,
    },
    max_deposit: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    earlyPenaltyPercent: {
      type: DataTypes.DECIMAL(5, 2), // e.g., 1.50% penalty
      allowNull: false,
    },
    paused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    sequelize,
    timestamps: false,
  }
);

export default StakingPlan;
