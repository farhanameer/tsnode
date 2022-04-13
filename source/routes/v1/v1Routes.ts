import express from "express";
import categoryRoutes from "./category";

const router = express.Router();
router.use("/categories", categoryRoutes);

export = router;
