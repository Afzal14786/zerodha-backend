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

app.use(cors({
  origin: [process.env.DASHBOARD_URL, process.env.FRONTEND_URL], // frontend/dashboard (react) app origin
  credentials: true,               // allow cookies
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

app.get('/', (req, res)=> {
    console.log(`Request from /`);
    res.send(`The Server Is Running Fine on Port http://localhost:${process.env.PORT}`);
})


// dbConnection 
dbConnection()
export default app;
