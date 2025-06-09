import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface TokenTransferAttributes {
  id: number;
  from_user_id: number;
  to_user_id: number;
  token_id: number;
  amount: number;
  fee: number;
  created_at: Date;
  updated_at: Date;
}

type TokenTransferCreationAttributes = Omit<
  TokenTransferAttributes,
  "id" | "created_at" | "updated_at"
>;

const TokenTransfer = sequelize.define<
  Model<TokenTransferAttributes, TokenTransferCreationAttributes>
>(
  "TokenTransfer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
    },
    fee: {
      type: DataTypes.DECIMAL(32, 18),
      allowNull: false,
      defaultValue: 0,
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
    timestamps: false,
  }
);

export default TokenTransfer;
