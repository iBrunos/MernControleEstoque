import { Router} from "express"
import entryController from "../controllers/entry.controller.js";
import { validId, validUser } from "../src/middlewares/global.middlewares.js";

const router = Router();

router.post("/", entryController.createService);
router.get("/", entryController.findAll);
router.get("/:id", validId, validUser, entryController.findById);
router.patch("/:id", validId, validUser, entryController.update)

export default router;