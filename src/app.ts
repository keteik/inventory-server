import mongoose from "mongoose"; 
import express from 'express';
import 'dotenv/config';
import { verifyToken } from './middleware/auth';
import { userRouter } from "./routes/user.route";
import { authRouter } from "./routes/auth.route";
import { deviceRouter } from "./routes/device.route";

const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

async function server() {
    // Start server
    try {
        await startServer();
        app.use('/api/v1/auth', authRouter);
        app.use('/api/v1/device', deviceRouter);
        app.use(verifyToken);
        app.use('/api/v1/user', userRouter);
    } catch (err) {
        console.log(err);
    }
}

async function startServer(): Promise<void> {
    /* Load env variables */
    const MONGO_URI: string | undefined = process.env.MONGO_URI;
    const HTTP_PORT: string | undefined = process.env.HTTP_PORT;

    if(!MONGO_URI)
        throw new Error("URI for DB is not specified or invalid!");
        
    if(!HTTP_PORT)
        throw new Error("PORT for http server is not specified or invalid!");

    try {
        /* Connect to db*/
        await mongoose.connect("mongodb://" + MONGO_URI + "/inventory");
        //await mongoose.connect(MONGO_URI);
        console.log("Connected to DB!");

    /* Start listening */
        app.listen(HTTP_PORT, () => {
            console.log(`Running HTTP server at port ${HTTP_PORT}!`);
        });
    } catch(err) {
        console.error(err);
    }    
}

server();