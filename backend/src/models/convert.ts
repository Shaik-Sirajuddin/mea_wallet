import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface ConvertAttributes {
  id: number;
  from_amount: number;
  to_amount: number;
  from_balance_id: number;
  to_balance_id: number;
  from_token_id: number;
  to_token_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

type ConvertCreationAttributes = Omit<
  ConvertAttributes,
  "id" | "created_at" | "updated_at"
>;

const Convert = sequelize.define<
  Model<ConvertAttributes, ConvertCreationAttributes>
>(
  "Convert",
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
    tableName: "converts", // optional but recommended
    timestamps: false,
  }
);

export default Convert;
