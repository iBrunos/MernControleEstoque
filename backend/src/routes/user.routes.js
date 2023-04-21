import { Router} from "express"
import userController from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, userController.createService);
router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, validId, validUser, userController.findById);
router.patch("/:id", authMiddleware, validId, validUser, userController.update)
router.delete('/:id', authMiddleware, userController.deleteUser);
export default router;