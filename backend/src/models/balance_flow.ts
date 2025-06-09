import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";

class BalanceFlow extends Model<
  InferAttributes<BalanceFlow>,
  InferCreationAttributes<BalanceFlow>
> {
  declare id: CreationOptional<number>;
  declare type: number;
  declare ref_type_id: number; //the row id of the corresponding table that bought change in balance
  declare balance_id: number;
  declare prev_amount: string;
  declare change_amount: string; //amount of change + or -
  declare balance_seq_no: number;
  declare isLockedBalance: CreationOptional<boolean>;
  declare isAdminUser: CreationOptional<boolean>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

BalanceFlow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    change_amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    balance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prev_amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    ref_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance_seq_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAdminUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isLockedBalance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

export default BalanceFlow;
