import express from "express"
import {authMiddleware} from "../middleware/auth.middleware.js"
import wrapError from "../middleware/wrapError.js"
import { placeOrder, getAllOrders } from "../controller/order.controller.js";

const router = express.Router();

router.post("/new-order", authMiddleware, wrapError(placeOrder));
router.get("/all-orders", authMiddleware, wrapError(getAllOrders));
export default router;