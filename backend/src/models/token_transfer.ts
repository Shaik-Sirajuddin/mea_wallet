import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

class TokenTransfer extends Model {
  declare id: number;
  from_user_id: number;
  to_user_id: number;
  token_id: number;
  amount: number;
  fee: number;
  declare created_at: Date;
  declare updated_at: Date;
}

TokenTransfer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: 0,
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

export default TokenTransfer;
