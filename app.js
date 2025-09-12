import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";

import holdingRouter from "./routers/holding.route.js";
import positionRouter from "./routers/position.router.js";
import registerRoute from "./routers/user/register.router.js";
import userRoute from "./routers/user/user.router.js";
import loginRoute from './routers/user/login.router.js';
import stockRoute from "./routers/stock.route.js";
import orderRoute from "./routers/order.router.js";

dotenv.config({quiet:true});
const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`Blocked CORS request from: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended: true}));


// router calls for registering the users
app.use("/api/v1/holdings", holdingRouter);
app.use("/api/v1/positions", positionRouter);
app.use("/api/v1/user/register", registerRoute);

// route calling for login the user into dashboard
app.use("/api/v1/user", loginRoute);

app.use("/api/v1/user", userRoute);

// the stock api
app.use("/api/v1/stocks", stockRoute);
// user place a new order
app.use("/api/v1/order", orderRoute);



// dbConnection 
dbConnection()
export default app;
