import { Router } from "express";
import {updateStocks, getStock } from "../controller/stock.controller.js";

const router = Router();

router.put("/update", updateStocks);
// this is for searching the perticual stocks
router.get("/search", getStock);

export default router;