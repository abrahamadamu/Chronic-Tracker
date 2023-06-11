import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

export const backend = onRequest(app);
