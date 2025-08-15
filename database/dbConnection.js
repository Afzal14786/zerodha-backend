import mongoose from "mongoose"

const dbConnection = ()=> {
    mongoose.connect(process.env.MONGO_URL, {
        dbname: "zerodha-backend"
    }).then(()=> {
        console.log(`DB Connected Successfully`);
    }).catch((err)=> {
        console.log(err);
    })
}

export default dbConnection;