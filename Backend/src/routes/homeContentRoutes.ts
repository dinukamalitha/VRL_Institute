import express from "express";
import {getHomeContent, updateHomeContent} from "../controllers/homeContent.controller";

const router = express.Router();

router.get("/", getHomeContent);
router.patch("/", updateHomeContent);

export default router;
