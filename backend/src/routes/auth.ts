import { Router } from "express";
import { signUpController } from "../controllers/auth/signupController";
import { loginController } from "../controllers/auth/loginController";
import logoutController from "../controllers/auth/logoutController";

const router = Router();

router.post("/login", loginController);

router.post("/signup", signUpController);

router.get("/logout", logoutController);

export default router;
