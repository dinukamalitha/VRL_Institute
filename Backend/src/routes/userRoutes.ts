import { Router } from "express";
import {getUsers, loginUser, registerUser} from "../controllers/user.controller";
import {authMiddleware, requireRole} from "../middlewares/auth";
import { validate } from "../middlewares/validation.middleware";
import { registerUserSchema, loginUserSchema } from "../validations/user.validations";
import { authLimiter } from "../middlewares/rateLimiter.middleware";

const router = Router();

router.post("/register", authLimiter, validate(registerUserSchema), registerUser);
router.post("/login", authLimiter, validate(loginUserSchema), loginUser);
router.get("/", authMiddleware, requireRole(["admin"]), getUsers);

export default router;
