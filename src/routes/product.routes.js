import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", productController.createService);
router.get("/", productController.findAll);
router.get("/:id", productController.findById);
router.put("/:id", productController.update);
router.delete("/:id", productController.deleteService);

export default router;
