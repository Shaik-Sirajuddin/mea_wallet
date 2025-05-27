import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface StakingEnrollmentAttributes {
  id: number;
  user_id: number;
  plan_id: number;
  amount: number;
  enroll_time: Date;
  close_time: Date | null;
  acc_interest: number | null;
  withdrawn_amount: number | null;
  created_at: Date;
  updated_at: Date;
}

type StakingEnrollmentCreationAttributes = Omit<
  StakingEnrollmentAttributes,
  "id" | "created_at" | "updated_at"
>;

const StakingEnrollment = sequelize.define<
  Model<StakingEnrollmentAttributes, StakingEnrollmentCreationAttributes>
>(
  "StakingEnrollment",
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
    tableName: "staking_enrollments", // optional but good for clarity
    timestamps: false,
  }
);

export default StakingEnrollment;
