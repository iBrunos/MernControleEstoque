import { Router} from "express"
import stockController from "../controllers/stock.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, stockController.createService);
router.get("/", authMiddleware, stockController.findAll);
router.get("/:id", authMiddleware, validId, validUser, stockController.findById);
router.patch("/:id", authMiddleware, validId, validUser, stockController.update)

export default router;