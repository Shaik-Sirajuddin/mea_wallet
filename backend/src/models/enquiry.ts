import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../database/connection";

interface EnquiryAttributes {
  id: number;
  userId: number;
  content: string;
  read: boolean;
  resolved: boolean;
  created_at: Date;
  updated_at: Date;
}

type EnquiryCreationAttributes = Omit<
  EnquiryAttributes,
  "id" | "created_at" | "updated_at"
>;

const Enquiry = sequelize.define<
  Model<EnquiryAttributes, EnquiryCreationAttributes>
>(
  "Enquiry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false,
  }
);

export default Enquiry;
