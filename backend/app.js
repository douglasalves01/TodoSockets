import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/", userRouter);
try {
  connectDb();
} catch (error) {
  console.log(err);
}

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`http://localhost:${process.env.PORT}`);
});
