import express from "express"
import { addAllHolding, getAllHoldings } from "../controller/holding.controller.js";
const router =  express.Router();

// router.get("/addHoldings", addAllHolding);
router.get("/allHoldings", getAllHoldings);

export default router;