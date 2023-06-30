import { Router } from "express";
import * as Auth from "../controllers/auth";

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

export default router;
