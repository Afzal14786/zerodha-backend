import express from "express";
import wrapError from "../../middleware/wrapError.js";
import {getAccountActiveData} from "../../controller/user/user.register.js"
import {authMiddleware} from "../../middleware/auth.middleware.js"
const router = express.Router();

/**
 * getting data from the database
 */

router.get('/account-active', authMiddleware, wrapError(getAccountActiveData));

export default router;