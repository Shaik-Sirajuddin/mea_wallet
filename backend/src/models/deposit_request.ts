import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";
import { DepositStatus } from "../enums/DepositStatus";

class DepositRequest extends Model<
  InferAttributes<DepositRequest>,
  InferCreationAttributes<DepositRequest>
> {
  declare id: CreationOptional<number>;
  declare hash: string;
  declare user_id: number;
  declare status: CreationOptional<number>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

DepositRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: DepositStatus.PENDING,
    },
    hash: {
      type: DataTypes.STRING,
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default DepositRequest;
