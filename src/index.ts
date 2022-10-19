import express from 'express'
import http from 'http'
import mongoose from 'mongoose'

import { config } from './config/config'
import Logging from './library/Logging';

const router = express();

/** connect to mongo */
mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("connected to db")
    })
    .catch(error => {
        Logging.error(`error connecting to db: ${error}`)
})
