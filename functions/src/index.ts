import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import { connect } from "./models/Connection";

import patients from "./routes/Patients";

const app = express();
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connect();
  } catch (e) {
    res.status(500).send("db connection error");
  }
  next();
});

app.use("/patients", patients);

app.get("/", (req, res, next) => {
  // throw createError(400, "some error");
  res.send("<h1>Working</h1>");
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).send(err.message || "Something went wrong");
});

export const backend = onRequest(app);
