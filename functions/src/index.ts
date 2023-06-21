import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import { connect } from "./models/Connection";

import * as cors from "cors";
import { corsOptions } from "./Config/cors";

import patients from "./routes/Patients";
import visits from "./routes/Visits";

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

app.get("/", (req, res, next) => {
  res.send("<h1>Working</h1>");
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 502).send(err.message || "Something went wrong");
});

export const backend = onRequest(app);
// export const backend = onRequest((req, res) => {
//   return cors(corsOptions)(req, res, () => {
//     return app(req, res);
//     res.setHeader("Access-Control-Allow-Origin", "*");
//   });
// });
