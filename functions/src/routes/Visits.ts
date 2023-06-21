import { Router } from "express";
import * as Visits from "../controllers/Data/visit";
import * as createError from "http-errors";

const routes = Router();

routes.post("/find", async (req, res, next) => {
  try {
    const result = await Visits.find(req.body);
    res.status(200).send(result ?? []);
  } catch (e: any) {
    next(createError(e));
  }
});

export default routes;
