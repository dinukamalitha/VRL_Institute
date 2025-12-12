import { Router } from "express";
import {createEvent, deleteEvent, getAllEvents, getEventById, updateEvent} from "../controllers/events.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createEventSchema,
    updateEventSchema,
    getEventByIdSchema,
    deleteEventSchema
} from "../validations/events.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", validate(getEventByIdSchema), getEventById);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateEventSchema), updateEvent);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteEventSchema), deleteEvent);

export default router;
