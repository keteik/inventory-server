import { Request, Response } from "express";

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
        throw new Error("URI for connection to database not specified!");
        
    if(!HTTP_PORT)
        throw new Error("PORT for http server is not specified!");

    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully!");

        app.listen(HTTP_PORT, () => {
            console.log(`HTTP server is running at port ${HTTP_PORT}!`);
        });
    } catch(err) {
        console.error(err);
    }    
}