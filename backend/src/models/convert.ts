import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";

class Convert extends Model<
  InferAttributes<Convert>,
  InferCreationAttributes<Convert>
> {
  declare id: CreationOptional<number>;
  declare from_amount: string; // Stored as DECIMAL => use string
  declare to_amount: string;
  declare from_balance_id: number;
  declare to_balance_id: number;
  declare from_token_id: number;
  declare to_token_id: number;
  declare user_id: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Convert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from_amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    to_amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    from_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_balance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
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
    sequelize,
    tableName: "converts",
  }
);

export default Convert;
