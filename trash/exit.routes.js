import { Router} from "express"
import exitController from "../controllers/entry.controller.js";
import { validId, validUser } from "../src/middlewares/global.middlewares.js";

const router = Router();

router.post("/", exitController.createService);
router.get("/", exitController.findAll);
router.get("/:id", validId, validUser, exitController.findById);
router.patch("/:id", validId, validUser, exitController.update)

export default router;