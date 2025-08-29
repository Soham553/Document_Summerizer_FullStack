import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/user.route.js';


const app = express();

app.use(cors({
    origin : process.env.CORS_ORG,
    credentials : true
}))

app.use(cookieParser());
app.use(express.json({limit : "16kb" }));
app.use(express.urlencoded({ extended : true, limit : "16kb" }));

app.use("/docsum/user/", router)


export default app;
