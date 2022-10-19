import express, { Router } from 'express'
import http from 'http'
import mongoose from 'mongoose'

import { config } from './config/config'
import Logging from './library/Logging';

const app = express();

/** connect to mongo */
mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("connected to db")
        StartServer();
    })
    .catch(error => {
        Logging.error(`error connecting to db: ${error}`)
})


/** create a server */

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incoming request: -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
        Logging.info(`Response: -> Method: [${req.method}], URL: [${req.url}], IP: [${req.socket.remoteAddress}], Status: [${res.statusCode}]`);
        })
        next();
    })

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
            return res.status(200).json({});
        }

        next();
    })

    /**Health check */
    app.get('/ping', (req, res, next) => {
        return res.status(200).json({ message: "pong" });
    })

    /** Not found */
    app.use((req, res, next) => {
        let error = new Error("Not found");

        Logging.error(error);

        return res.status(404).json({ message: error.message });
    })

    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`Server listening on port ${config.server.port}`);
    })
}
