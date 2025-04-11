import { Router } from "express";
import {
  keepLogin,
  register,
  signIn,
  verifyAccount,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";
import { body } from "express-validator";
import { regisValidation } from "../middleware/validation/auth";

const route = Router();

route.post("/register", regisValidation, register);
route.post("/signin", signIn);
route.get("/keeplogin", verifyToken, keepLogin);
route.patch("/verify", verifyToken, verifyAccount);

export default route;
