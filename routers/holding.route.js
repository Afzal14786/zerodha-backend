import express from "express"
import { getAllHoldings } from "../controller/holding.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
const router =  express.Router();

// router.get("/addHoldings", addAllHolding);
router.get("/allHoldings", authMiddleware, getAllHoldings);

export default router;