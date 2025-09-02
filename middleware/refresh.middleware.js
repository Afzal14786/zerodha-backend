import jwt from "jsonwebtoken";
import redis from "../config/redisClint.js";
import { generateAccessToken } from "../config/jwt.js";

export const refreshMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!accessToken) return next();

    // If valid, continue
    jwt.verify(accessToken, process.env.JWT_SECRET);
    return next();

  } catch (error) {
    // Only handle expired tokens here. Anything else -> let authMiddleware handle.
    if (error.name !== "TokenExpiredError") {
      return next(); // DO NOT next(error) for malformed; let authMiddleware respond 401
    }

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

      // CRITICAL: Replace the header so authMiddleware verifies the fresh token
      req.headers.authorization = `Bearer ${newAccessToken}`;

      // Optionally let the client update its local storage
      res.setHeader("x-access-token", newAccessToken);

      return next();
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      return res.status(401).json({ success: false, message: "Failed to refresh token. Please log in again." });
    }
  }
};
