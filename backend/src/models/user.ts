import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  totp_secret: string;
  email_verified: boolean;
  twofa_completed: boolean;
  emoji: string;
  created_at: Date;
  updated_at: Date;
}

type UserCreationAttributes = Omit<
  UserAttributes,
  "id" | "created_at" | "updated_at"
>;

const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totp_secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    twofa_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    emoji: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "😀",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

export default User;
