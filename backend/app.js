import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js";
import { todoRouter } from "./routes/todoRoutes.js";
import { listRouter } from "./routes/listRoutes.js";
import cors from "cors";
import Pusher from "pusher";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//routes
app.use("/", userRouter);
app.use("/", todoRouter);
app.use("/", listRouter);

export const pusher = new Pusher({
  appId: process.env.APPID_PUSHER,
  key: process.env.KEY_PUSHER,
  secret: process.env.SECRET_PUSHER,
  cluster: process.env.CLUSTER_PUSHER,
  useTLS: process.env.USETLS_PUSHER,
});

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
