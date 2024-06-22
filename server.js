import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import path from "path";
// env config
dotenv.config();

// mongodb connection
connectDb();
// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Node server is running",
  });
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/note", notesRoutes);

// port heroku
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(
    `server running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
