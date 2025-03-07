import { Router } from "express";
import Register from "../controllers/auth/Register";
import login from "../controllers/auth/Login";
const router = Router();

router.post('/login', login);
router.post('/register', Register);
export default router;
