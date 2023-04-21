import { Router } from "express"
import exitController from "../controllers/exit.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", exitController.createService);
router.get("/", exitController.findAll);
router.get("/:id", validId, validUser, exitController.findById);
router.patch("/:id", validId, validUser, exitController.update);
router.delete("/:id", exitController.deleteExit); // nova rota DELETE

export default router;
