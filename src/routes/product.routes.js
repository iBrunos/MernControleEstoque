import express from "express";
import productController from "../controllers/product.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = express.Router();

router.post("/", productController.createService);
router.get("/", productController.findAll);
router.get("/:id", validId, validUser, productController.findById);
router.put("/:id", validId, validUser,productController.update);
router.delete("/:id", productController.deleteService);

export default router;
