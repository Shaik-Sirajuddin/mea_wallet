import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

class TokenData extends Model {
  declare id: number;
  token_id: number;
  circulating_suppy: number;
  total_supply: number;
  price: number;
  swap_price: number; //todo : decide whether to use exchange price
  declare created_at: Date;
  declare updated_at: Date;
}

TokenData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    circulating_suppy: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    total_supply: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    swap_price: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
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
  { sequelize, timestamps: false }
);
export default TokenData;
