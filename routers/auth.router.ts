import { Router } from "express";
import {
  keepLogin,
  register,
  signIn,
  uploadProfileImg,
  verifyAccount,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";
import { body } from "express-validator";
import { regisValidation } from "../middleware/validation/auth";
import { uploader } from "../middleware/uploader";

const route = Router();

route.post("/register", regisValidation, register);
route.post("/signin", signIn);
route.get("/keeplogin", verifyToken, keepLogin);
route.patch("/verify", verifyToken, verifyAccount);
route.patch(
  "/profile-img",
  verifyToken,
  uploader("/profile-img", "PRF").single("img"),
  uploadProfileImg
);

export default route;
