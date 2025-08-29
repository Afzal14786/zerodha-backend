import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";

import holdingRouter from "./routers/holding.route.js";
import positionRouter from "./routers/position.router.js";
import testRoute from "./routers/user/test.route.js";

dotenv.config({quiet:true});
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended: true}));


// router calls
app.use("/api/v1/holdings", holdingRouter);
app.use("/api/v1/positions", positionRouter);
app.use("/api/v1", testRoute);


app.get('/', (req, res)=> {
    console.log(`Request from /`);
    res.send(`The Server Is Running Fine`);
})


// dbConnection 
dbConnection()
export default app;
