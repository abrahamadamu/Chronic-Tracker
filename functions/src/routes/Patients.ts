import { Router } from "express";
import * as Patients from "../controllers/patients";
import * as createError from "http-errors";

const routes = Router();

routes.post("/add", async (req, res, next) => {
  try {
    if (!req.body) next(createError(400, "empty request"));

    console.log({ data: req.body });
    console.log(typeof req.body);

    await Patients.addPatient(req.body);
    res.status(200).send({ success: true });
  } catch (e: any) {
    next(createError(500, e.message));
  }
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
