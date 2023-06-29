import * as functions from "firebase-functions";
import * as express from "express";
import { connect } from "./models/Connection";

import * as cors from "cors";
import { corsOptions } from "./Config/cors";

import patients from "./routes/Patients";
import visits from "./routes/Visits";
import auth from "./routes/Auth";

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  try {
    await connect();
  } catch (e) {
    res.status(500).send("db connection error");
  }
  next();
});

app.use("/patients", patients);
app.use("/visits", visits);
app.use("/auth", auth);

app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 502).send(err.message || "Something went wrong");
});

export const backend = functions
  .runWith({ maxInstances: 40 })
  .https.onRequest(app);
