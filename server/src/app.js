import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { logger } from "./utils/logger.js";
import authRoutes from "./routes/authRoutes.js";
import empinfoRoutes from "./routes/empinfoRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import masterStuRoutes from "./routes/masterStuRoutes.js";
import programInfoRoutes from "./routes/programInfoRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import roleRoutes from "./routes/rolesRoutes.js";
import studentinfoRoutes from "./routes/studentInfoRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import supervisoryMeetingRoutes from "./routes/supervisoryMeetingRoutes.js";
import thesisRoutes from "./routes/thesisRoutes.js";
import tblDepartmentsRoutes from "./routes/tblDepartmentsRoutes.js";
import cgsadminRoutes from "./routes/cgsAdminRoutes.js";
// import examinerRoutes from "./routes/examinerRoutes.js";

dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
    cors({
        origin: function (origin, callback){
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: This origin is not allowed"));
      }
    }, 
        credentials: true
    }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// Use routes
app.use("/", authRoutes);
app.use("/empinfo", empinfoRoutes);
app.use("/evaluation", evaluationRoutes);
app.use("/masterstu", masterStuRoutes);
app.use("/programs", programInfoRoutes);
app.use("/progress", progressRoutes);
app.use("/roles", roleRoutes);
app.use("/studentsinfo", studentinfoRoutes);
app.use("/supervisors", supervisorRoutes);
app.use("/supervisory-meetings", supervisoryMeetingRoutes);
app.use("/thesis", thesisRoutes);
app.use("/departments", tblDepartmentsRoutes);
app.use("/cgsadmin", cgsadminRoutes);
// app.use("/examiner", examinerRoutes);


export default app;