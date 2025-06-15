/**
 * Each deposit request can have multiple asset credits
 */

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";

class AssetCredit extends Model<
  InferAttributes<AssetCredit>,
  InferCreationAttributes<AssetCredit>
> {
  declare id: CreationOptional<number>;
  declare deposit_request_id: number;
  declare token_id: number;
  declare amount: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

AssetCredit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    deposit_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_id: {
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default AssetCredit;
