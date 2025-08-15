import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";

dotenv.config({path : "./.env"});
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended: true}));


app.get('/', (req, res)=> {
    console.log(`Request from /`);
    res.send(`The Server Is Running Fine`);
})


// dbConnection 
dbConnection()
export default app;