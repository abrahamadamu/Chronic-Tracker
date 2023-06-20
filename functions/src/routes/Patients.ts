import { Router } from "express";
import * as Patients from "../controllers/Data/patient";
import * as createError from "http-errors";

const routes = Router();

routes.post("/add", async (req, res, next) => {
  if (!req.body) next(createError(400, "empty request"));

  try {
    console.log({ data: JSON.stringify(req.body) });
    console.log(typeof req.body);

    await Patients.savePatient(req.body, true);
    res.status(200).send({ success: true });
  } catch (e: any) {
    next(createError(e));
  }
});

routes.post("/find", async (req, res, next) => {
  try {
    const result = await Patients.find(req.body);
    res.status(200).send(result ?? []);
  } catch (e: any) {
    next(createError(e));
  }
});

export default routes;
