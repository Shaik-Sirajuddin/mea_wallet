import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { sequelize } from "../database/connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare totp_secret: string;
  declare user_iv: string;
  declare email_verified: CreationOptional<boolean>;
  declare twofa_completed: CreationOptional<boolean>;
  declare emoji: CreationOptional<string>;
  declare resetHash: CreationOptional<string | null>;
  declare resetHashExpiryTime: CreationOptional<Date | null>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
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
    user_iv: {
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
    resetHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    resetHashExpiryTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
    modelName: "User",
    timestamps: false,
  }
);

export default User;
