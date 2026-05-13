import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import profileRoute from "./routes/profileRoute.js";
import adminRoute from "./routes/admin/adminRoute.js";
import workerProfileRoute from "./routes/workerProfileRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", profileRoute);
app.use("/api/admin", adminRoute);
app.use("/api/workers", workerProfileRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
