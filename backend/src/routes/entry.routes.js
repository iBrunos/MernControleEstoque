import { Router} from "express"
import entryController from "../controllers/entry.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, entryController.createService);
router.get("/", authMiddleware,entryController.findAll);
router.get("/:id", authMiddleware, entryController.findById);
router.patch("/:id", authMiddleware, entryController.update)
router.delete('/:id', authMiddleware,entryController.deleteEntry);
export default router;