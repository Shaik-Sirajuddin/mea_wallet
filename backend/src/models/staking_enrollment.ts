import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

class StakingEnrollment extends Model {
  declare id: number;
  user_id: number;
  plan_id: number;
  amount: number;
  enroll_time: Date;
  close_time: Date;
  acc_interest: number;
  withdrawn_amount: number;
  declare created_at: Date;
  declare updated_at: Date;
}

StakingEnrollment.init(
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
      allowNull: true, // allow null if still active
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
    sequelize,
    timestamps: false,
  }
);

export default StakingEnrollment;
