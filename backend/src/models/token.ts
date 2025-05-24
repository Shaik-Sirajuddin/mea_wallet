import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

class Token extends Model {
  declare id: number;
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  declare created_at: Date;
  declare updated_at: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(1000),
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
export default Token;
