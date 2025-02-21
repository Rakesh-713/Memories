import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRouter from "./routes/posts.js";
import userRouter from "./routes/users.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRouter);
app.use("/user", userRouter);

// const CONNECTION_URL =
//   "mongodb+srv://rakesh:rakesh123@cluster0.cl2kgqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => app.listen(PORT),
    () => console.log(`Server running on port number:${PORT}`)
  )
  .catch((error) => console.log(`${error} did not Connect`));

// mongoose.set("useFindAndModify", false);
