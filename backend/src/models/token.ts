import { DataTypes, Model, Sequelize, Optional } from "sequelize";
import { sequelize } from "../database/connection";

// Interface for all Token attributes
interface TokenAttributes {
  id: number;
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  created_at: Date;
  updated_at: Date;
}

// Interface for attributes required when creating a Token
interface TokenCreationAttributes
  extends Optional<TokenAttributes, "id" | "created_at" | "updated_at"> {}

// Define the model with explicit typing
const Token = sequelize.define<Model<TokenAttributes, TokenCreationAttributes>>(
  "Token",
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
    decimals: {
      type: DataTypes.INTEGER,
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
  {
    timestamps: false,
  }
);

export default Token;
