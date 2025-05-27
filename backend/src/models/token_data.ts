import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface TokenDataAttributes {
  id: number;
  token_id: number;
  circulating_suppy: number;
  total_supply: number;
  price: number;
  swap_price: number;
  created_at: Date;
  updated_at: Date;
}

type TokenDataCreationAttributes = Omit<
  TokenDataAttributes,
  "id" | "created_at" | "updated_at"
>;

const TokenData = sequelize.define<
  Model<TokenDataAttributes, TokenDataCreationAttributes>
>(
  "TokenData",
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
  {
    timestamps: false,
  }
);

export default TokenData;
