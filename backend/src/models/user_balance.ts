import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

// Valid
class UserBalance extends Model {
  declare id: number;
  userId: number;
  tokenId: number;
  amount: number;
  lockedAmount: number;
}

UserBalance.init(
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
      defaultValue: 0,
    },
    lockedAmount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  { sequelize, timestamps: false }
);

export default UserBalance;
