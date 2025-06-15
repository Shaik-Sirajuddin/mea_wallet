import {
  DataTypes,
  Model,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../database/connection";

class TokenData extends Model<
  InferAttributes<TokenData>,
  InferCreationAttributes<TokenData>
> {
  declare id: CreationOptional<number>;
  declare token_id: number;
  declare circulating_suppy: number;
  declare total_supply: number;
  declare price: number;
  declare swap_price: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default TokenData;
