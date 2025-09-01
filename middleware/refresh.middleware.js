import jwt from "jsonwebtoken";
import redis from "../config/redisClint.js";
import { generateAccessToken } from "../config/jwt.js";

export const refreshMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader?.split(" ")[1];
        
        if (!accessToken || !authHeader || !authHeader.startsWith("Bearer ")) {
            return next();
        }

        jwt.verify(accessToken, process.env.JWT_SECRET);
        return next(); // The token is valid, continue
    } catch (error) {
        // Only handle expired token errors
        if (error.name !== "TokenExpiredError") {
            return next(error);
        }

        // If the token is expired, try to refresh it using the refresh token from cookies
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ success: false, message: "No refresh token provided" });
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const storedRefreshToken = await redis.get(`refresh:${decoded.id}`);

            if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
                return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
            }

            const newAccessToken = generateAccessToken({ id: decoded.id });
            res.locals.accessToken = newAccessToken; // Store the new token for the controller
            next();
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            res.status(401).json({ success: false, message: "Failed to refresh token. Please log in again." });
        }
    }
};
