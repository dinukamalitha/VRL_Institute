import { Router } from "express";
import {
    createStaffMember, deleteStaffMember,
    getAllStaffMembers,
    getStaffMemberById,
    updateStaffMember
} from "../controllers/staff.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createStaffMemberSchema,
    updateStaffMemberSchema,
    getStaffMemberByIdSchema,
    deleteStaffMemberSchema
} from "../validations/staff.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createStaffMemberSchema), createStaffMember);
router.get("/", getAllStaffMembers);
router.get("/:id", validate(getStaffMemberByIdSchema), getStaffMemberById);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateStaffMemberSchema), updateStaffMember);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteStaffMemberSchema), deleteStaffMember);

export default router;
