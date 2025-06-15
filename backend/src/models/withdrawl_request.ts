import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";
import { WithdrawStatus } from "../enums/WithdrawStatus";

class WithdrawlRequest extends Model<
  InferAttributes<WithdrawlRequest>,
  InferCreationAttributes<WithdrawlRequest>
> {
  declare id: CreationOptional<number>;
  declare hash?: string;
  declare user_id: number;
  declare token_id: number;
  declare amount: string;
  declare status: CreationOptional<number>;
  //admin approved or rejected time ,
  declare processed_at: CreationOptional<Date>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

WithdrawlRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: WithdrawStatus.PENDING_VERIFICATION,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    token_id: {
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
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default WithdrawlRequest;
