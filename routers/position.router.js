import express from "express";
import { getAllPosition } from "../controller/position.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get("/addPositions", addPositions);
router.get("/allPositions", authMiddleware, getAllPosition);


export default router;