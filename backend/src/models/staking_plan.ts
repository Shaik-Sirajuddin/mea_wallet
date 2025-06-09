import {
  DataTypes,
  Model,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/connection";

class StakingPlan extends Model<
  InferAttributes<StakingPlan>,
  InferCreationAttributes<StakingPlan>
> {
  declare id: CreationOptional<number>;
  declare tokenId: number;
  declare lockDays: number;
  declare apy: number;
  declare min_deposit: number;
  declare max_deposit: number;
  declare earlyPenaltyPercent: number;
  declare paused: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
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
      type: DataTypes.DECIMAL(5, 2),
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
      type: DataTypes.DECIMAL(5, 2),
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default StakingPlan;
