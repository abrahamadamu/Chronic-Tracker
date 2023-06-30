import { Handler } from "express";
import { Router } from "express";
import * as Auth from "../controllers/auth";
import * as createError from "http-errors";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    res.send({ accessToken: await Auth.login(req.body) });
  } catch (e) {
    next(e);
  }
});

router.post("/verify", async (req, res, next) => {
  try {
    res.send({ valid: Auth.verifyToken(req.body.accessToken) });
  } catch (e) {
    next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    res.send({ accessToken: await Auth.signup(req.body) });
  } catch (e) {
    next(e);
  }
});

export const Authenticate: Handler = (req, res, next) => {
  let accessToken = req.headers.authorization;
  if (!accessToken || accessToken.toLowerCase().indexOf("bearer ") < 0) {
    return next(createError(401, "Unauthorized"));
  }
  accessToken = accessToken?.split(" ")[1];

  if (Auth.verifyToken(accessToken)) {
    next();
  } else {
    next(createError(401, "Unauthorized"));
  }
};

export default router;
