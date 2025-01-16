import { Router } from "express";
import { getUserController } from "../controllers/user/getUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.get("/me", isAuthenticated, getUserController);

export default router;
