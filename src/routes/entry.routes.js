import { Router} from "express"
import entryController from "../controllers/entry.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, entryController.createService);
router.get("/", entryController.findAll);
router.get("/:id", validId, validUser, entryController.findById);
router.patch("/:id", validId, validUser, entryController.update)
router.delete('/:id', entryController.deleteEntry);
export default router;