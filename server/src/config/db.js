import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import initModels from "../models/init-models.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "aiu_pg_progress",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "mysql",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);

// Initialize all models and their relationships
const models = initModels(sequelize);
const { masterStu, supervisor } = models;

export { sequelize, models, masterStu, supervisor };
export default sequelize;