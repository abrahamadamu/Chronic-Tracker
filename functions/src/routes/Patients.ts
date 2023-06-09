import { Router } from "express";
import * as Patients from "../controllers/Data/patient";
import * as createError from "http-errors";

const routes = Router();

routes.post("/save", async (req, res, next) => {
  if (!req.body) next(createError(400, "empty request"));

  try {
    console.log({ data: JSON.stringify(req.body) });
    console.log(typeof req.body);

    const response = await Patients.save(req.body);
    res.status(200).send(response);
  } catch (e: any) {
    next(e);
  }
});

routes.post("/find", async (req, res, next) => {
  console.log({ authHeader: req.headers.authorization });

  try {
    const result = await Patients.find(req.body);
    res.status(200).send(result ?? []);
  } catch (e: any) {
    next(e);
  }
});

export default routes;
