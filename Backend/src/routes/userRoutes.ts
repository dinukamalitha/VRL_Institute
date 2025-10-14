import { Router } from "express";
import {getUsers, loginUser, registerUser} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, getUsers);

export default router;
