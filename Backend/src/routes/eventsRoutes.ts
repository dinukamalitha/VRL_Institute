import { Router } from "express";
import {createEvent, deleteEvent, getAllEvents, getEventById, updateEvent} from "../controllers/events.controller";

const router = Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
