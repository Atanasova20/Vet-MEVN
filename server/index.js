import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";

dotenv.config();

const PORT = process.env.APP_PORT || APP_SECOND_PORT;
const DB_CONNECTION = process.env.MONGO_DB_CONNECTION_KEY ?? '';

mongoose.connect(DB_CONNECTION).then(() => {
    console.log("Connected successfully to MongoDB");
}).catch((error) => {
    console.log("Error occur, failed to connect: " + error);
});

const app = express();

const dirname = path.resolve();

const csrf = csurf({cookie: true});

app.use(express.json());

app.use(cookieParser());

// TODO: Setup strictPolicy to images etc..
app.use(helmet({
    strictTransportSecurity: false,
}))

app.use(ExpressMongoSanitize()); // Sanitize Data in order to prevent NoSQL Query Injection

app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
}).on("error", (error) => {
    console.log(`Error occur when starting PORT: ${PORT}`);
});

// For the hosting -> Render, when we're going to add the app to the hosting platform
app.use(express.static(path.join(dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    const statusMessage = error.message || 'Internal Server Connection Error!';

    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: statusMessage
    });
});