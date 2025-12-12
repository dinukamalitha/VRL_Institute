import { Router } from "express";
import {
    createResourcePerson, deleteResourcePerson,
    getAllResourcePersons,
    getResourcePersonById, updateResourcePerson
} from "../controllers/resourcePerson.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createResourcePersonSchema,
    updateResourcePersonSchema,
    getResourcePersonByIdSchema,
    deleteResourcePersonSchema
} from "../validations/resourcePerson.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createResourcePersonSchema), createResourcePerson);
router.get("/", getAllResourcePersons);
router.get("/:id", validate(getResourcePersonByIdSchema), getResourcePersonById);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateResourcePersonSchema), updateResourcePerson);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteResourcePersonSchema), deleteResourcePerson);

export default router;
