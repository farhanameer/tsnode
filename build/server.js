"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const v1Routes_1 = __importDefault(require("./routes/v1/v1Routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("@utils/AppError"));
const AppErrorHandler_1 = __importDefault(require("middlewares/AppErrorHandler"));
const NAMESPACE = "Server";
const router = (0, express_1.default)();
logging_1.default.info(NAMESPACE, `METHOD: [] - URL: [] - IP: [${config_1.default.mongo.url}]`);
/** Connect to Mongo */
mongoose_1.default
    .connect("mongodb://localhost:27017/sample")
    .then((result) => {
    logging_1.default.info(NAMESPACE, "Mongo Connected");
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use("/api/v1", v1Routes_1.default);
// /** Error handling */
// router.use((req, res, next) => {
//     const error = new Error('Not found');
//     res.status(404).json({
//         message: error.message
//     });
// });
router.all("*", (req, res, next) => {
    // res.status(404).json({
    //     message:'api end point not found'
    // })
    // const err=new Error('API Route Not Found');
    // err.status='fail';
    // err.statusCode=404;
    next(new AppError_1.default("Api Rooute Not Found", 404));
});
router.use(AppErrorHandler_1.default);
const httpServer = http_1.default.createServer(router);
const running_server = httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));
process.on("unhandledRejection", (err) => {
    console.log("Unhadles Rejection", err);
    running_server.close(() => {
        process.exit(1);
    });
});
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("uncaught Exception ", err);
    running_server.close(() => {
        process.exit(1);
    });
});
