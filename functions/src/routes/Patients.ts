import { Router } from "express";
import * as Patients from "../controllers/Data/patient";
import * as createError from "http-errors";

const routes = Router();

routes.post("/add", async (req, res, next) => {
  if (!req.body) next(createError(400, "empty request"));

  console.log({ data: JSON.stringify(req.body) });
  console.log(typeof req.body);

  await Patients.addPatient(req.body, true);
  res.status(200).send({ success: true });
});

routes.post("/find", async (req, res) => {
  try {
    // Patients.addPatient(req.body);
  } catch (e) {
    // e.
  }
  res.send("hi :)");
});

export default routes;
