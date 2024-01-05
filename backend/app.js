import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js";
import { todoRouter } from "./routes/todoRoutes.js";
import { listRouter } from "./routes/listRoutes.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/", userRouter);
app.use("/", todoRouter);
app.use("/", listRouter);
try {
  await connectDb();
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
