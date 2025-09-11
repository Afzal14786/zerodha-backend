import mongoose from "mongoose"
import orderSchema from "../schemas/order.schemas.js";

const orderModel = new mongoose.model("Order", orderSchema);

export default orderModel;