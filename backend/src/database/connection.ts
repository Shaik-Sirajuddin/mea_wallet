import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_USER_PASS,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

// /dist/src/models for ts project
async function syncModels(
  models = path.join(process.cwd(), "dist/src/models")
) {
  const db: Record<string, any> = {};

  fs.readdirSync(models).forEach(async function (fileOrDir) {
    const fullPath = path.join(models, fileOrDir);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      syncModels(fullPath);
    } else if (fileOrDir.indexOf(".") !== 0 && fileOrDir.slice(-3) === ".js") {
      const model = await import(fullPath);
      const modelInstance = model.default;
      db[modelInstance.name] = modelInstance;
    }
  });

  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

export const makeConnection = async () => {
  await syncModels();
  await sequelize.authenticate();
  await sequelize.sync({ alter: false, force: false });
  console.log("Conneted to Database");
};
