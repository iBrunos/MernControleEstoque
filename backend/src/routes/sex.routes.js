import { Router } from "express";
const router = Router();

import { sex } from '../controllers/sex.controller.js'

router.post("/", sex);

export default router;