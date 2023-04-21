import { Router} from "express"
import stockController from "../controllers/stock.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", stockController.createService);
router.get("/", stockController.findAll);
router.get("/:id", validId, validUser, stockController.findById);
router.patch("/:id", validId, validUser, stockController.update)

export default router;