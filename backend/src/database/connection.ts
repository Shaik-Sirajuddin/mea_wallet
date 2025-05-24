import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export const makeConnection = async () => {
  await sequelize.authenticate();
  console.log("Conneted to Database")
};
