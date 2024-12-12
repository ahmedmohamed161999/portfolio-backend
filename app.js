import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";
import path from "path";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
); 
// const __dirname = path.resolve();
// app.use(
//   fileUpload({
//     useTempFiles: true,               // Use temporary files
//     tempFileDir: path.join(__dirname, 'tmp'),  // Directory to store temporary files
//     createParentPath: true,           // Create parent directories if needed
//     limits: {
//       fileSize: 10 * 1024 * 1024,     // Max file size is 10MB
//     },
//   })
// );
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;