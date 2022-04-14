import http from "http";
import bodyParser from "body-parser";
import express, { NextFunction } from "express";
import logging from "./config/logging";
import config from "./config/config";
import v1Routes from "./routes/v1/v1Routes";
import mongoose from "mongoose";
import AppError from "@utils/AppError";
import AppErrorHandler from "middlewares/AppErrorHandler";
import TryMiddleWare from "middlewares/GlobalTryCatch";
import tryCatch from "middlewares/GlobalTryCatch";

const NAMESPACE = "Server";

const router = express();

logging.info(NAMESPACE, `METHOD: [] - URL: [] - IP: [${config.mongo.url}]`);
/** Connect to Mongo */
mongoose
  .connect("mongodb://localhost:27017/sample")
  .then((result) => {
    logging.info(NAMESPACE, "Mongo Connected");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

/** Log the request */
router.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes go here */

router.use("/api/v1", v1Routes);

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
  next(new AppError("Api Rooute Not Found", 404));
});

router.use(AppErrorHandler);

const httpServer = http.createServer(router);

const running_server = httpServer.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);

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
