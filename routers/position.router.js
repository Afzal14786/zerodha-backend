import express from "express";
import { addPositions, getAllPosition } from "../controller/position.controller.js";
const router = express.Router();

router.get("/addPositions", addPositions);
router.get("/allPositions", getAllPosition);


export default router;