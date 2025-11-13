import app from "./app.js";
import {sequelize} from "./config/db.js";

console.log("ENV TEST:", process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

const PORT = process.env.PORT || 5000;

async function startServer() {
  let retries = 20;

  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("✅ Database connected successfully");
      
      // Sync models (creates tables if not exist)
      // Use alter: true to update tables without dropping data
      await sequelize.sync({ alter: true });
      console.log("✅ Database synced");

      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
      break; // exit loop on success
    } catch (error) {
      console.error(`❌ Database connection failed. Retries left: ${retries - 1}`, error.message);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // wait 5 seconds before retry
    }
  }
}

startServer();