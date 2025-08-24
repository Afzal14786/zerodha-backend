import mongoose from "mongoose";
import positionSchema from "../schemas/positions.schemas.js";

const positionModel = mongoose.model("position", positionSchema);

export default positionModel;