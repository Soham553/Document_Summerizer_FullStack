import { Router } from "express";
import { registerUser, loginUser, logout } from "../controller/user.controller.js";
import { verfiyjwt } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verfiyjwt ,logout)


export default router;