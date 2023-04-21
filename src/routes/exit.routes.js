import { Router } from "express"
import exitController from "../controllers/exit.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, exitController.createService);
router.get("/", authMiddleware, exitController.findAll);
router.get("/:id", authMiddleware, validId, validUser, exitController.findById);
router.patch("/:id", authMiddleware, validId, validUser, exitController.update);
router.delete("/:id", authMiddleware, exitController.deleteExit); // nova rota DELETE

export default router;
