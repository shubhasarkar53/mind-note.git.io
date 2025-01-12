import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth";
import funTionalityRoutes from "./routes/funtionality";
import { connectDb } from "./db/db";
import { globalErrorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
//load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTED_URL as string || "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE", // Specify allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization",
  })
);

//routes
app.use("/api/v1", funTionalityRoutes);
app.use("/api/v1/auth", authRoutes);

//connect to database
connectDb()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log("Server is listning on port:" + port);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  });

app.use(globalErrorHandler);
