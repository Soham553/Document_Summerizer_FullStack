import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';



const connectionDB = async () => {
     try {
        let join = await mongoose.connect(process.env.CONNECTIONDB);
        console.log("Successfully connected to DB: ", join.connection.name);
     }catch (error){
        console.log("Something went wrong while connecting to DB: ", error);
     }
}

connectionDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('server is running on port', process.env.PORT);
    })
})
.catch((error) => {
    console.log("Failed to connect to DB, server is not started: ", error);
})

export default connectionDB;

