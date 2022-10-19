"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const router = (0, express_1.default)();
/** connect to mongo */
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("connected to db");
})
    .catch(error => {
    Logging_1.default.error(`error connecting to db: ${error}`);
});
//# sourceMappingURL=index.js.map