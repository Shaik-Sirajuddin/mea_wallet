import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface UserBalanceAttributes {
  id: number;
  userId: number;
  tokenId: number;
  amount: string;
  lockedAmount: string;
  created_at: Date;
  updated_at: Date;
}

interface UserBalanceCreationAttributes
  extends Optional<UserBalanceAttributes, "id" | "created_at" | "updated_at"> {}

type UserBalanceModel = Model<
  UserBalanceAttributes,
  UserBalanceCreationAttributes
> &
  UserBalanceAttributes;

const UserBalance = sequelize.define<UserBalanceModel>(
  "UserBalance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: "0",
    },
    lockedAmount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: "0",
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
  }
);

export default UserBalance;
