import express from "express";
import wrapError from "../../middleware/wrapError.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { refreshMiddleware } from "../../middleware/refresh.middleware.js";


import { getAccountActiveData} from "../../controller/user/user.register.js";
import {logoutUser} from "../../controller/user/user.login.js";

const router = express.Router();

router.use(refreshMiddleware);
router.use(authMiddleware);


router.get("/account-active", wrapError(getAccountActiveData));
router.post("/logout", wrapError(logoutUser));

export default router;