import mongoose from "mongoose";
import holdingSchema from "../schemas/holdings.schema.js";


const holdingModel = mongoose.model("holding", holdingSchema);

export default holdingModel;