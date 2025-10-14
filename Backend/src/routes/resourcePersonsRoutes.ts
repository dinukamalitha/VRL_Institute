import { Router } from "express";
import {
    createResourcePerson, deleteResourcePerson,
    getAllResourcePersons,
    getResourcePersonById, updateResourcePerson
} from "../controllers/resourcePerson.controller";

const router = Router();

router.post("/", createResourcePerson);
router.get("/", getAllResourcePersons);
router.get("/:id", getResourcePersonById);
router.patch("/:id", updateResourcePerson);
router.delete("/:id", deleteResourcePerson);

export default router;
