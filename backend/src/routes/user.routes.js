import { Router} from "express"
import userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", authMiddleware, userController.createService);
router.get("/", authMiddleware, userController.findAll);
router.get("/:id", authMiddleware, userController.findById);
router.put("/:id", authMiddleware, userController.update)
router.delete('/:id', authMiddleware, userController.deleteUser);
export default router;