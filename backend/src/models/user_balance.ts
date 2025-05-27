import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";

//sequelize recommended approach starting 6.14+
class UserBalance extends Model<
  InferAttributes<UserBalance>,
  InferCreationAttributes<UserBalance>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare tokenId: number;
  declare amount: string;
  declare lockedAmount: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

UserBalance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: "0",
    },
    lockedAmount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: "0",
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
    timestamps: false,
  }
);

export default UserBalance;
