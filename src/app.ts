import mongoose from "mongoose"; 
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

try {
    await startServer();
} catch (err) {
    console.log(err);
}

async function startServer(): Promise<void> {
    const MONGO_URI: string | undefined = process.env.MONGO_URI;
    const HTTP_PORT: string | undefined = process.env.HTTP_PORT;

    if(!MONGO_URI)
        throw new Error("URI for DB is not specified or invalid!");
        
    if(!HTTP_PORT)
        throw new Error("PORT for http server is not specified or invalid!");

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB!");

        app.listen(HTTP_PORT, () => {
            console.log(`Running HTTP server at port ${HTTP_PORT}!`);
        });
    } catch(err) {
        console.error(err);
    }    
}