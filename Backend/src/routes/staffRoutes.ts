import { Router } from "express";
import {
    createStaffMember, deleteStaffMember,
    getAllStaffMembers,
    getStaffMemberById,
    updateStaffMember
} from "../controllers/staff.controller";

const router = Router();

router.post("/", createStaffMember);
router.get("/", getAllStaffMembers);
router.get("/:id", getStaffMemberById);
router.patch("/:id", updateStaffMember);
router.delete("/:id", deleteStaffMember);

export default router;
