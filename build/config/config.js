"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false,
};
const MONGO_USERNAME = process.env.MONGO_USERNAME || "superuser";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "supersecretpassword1";
const MONGO_HOST = process.env.MONGO_URL || `ds343895.mlab.com:43895/mongobongo`;
const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
const config = {
    mongo: MONGO,
    server: SERVER,
};
exports.default = config;
