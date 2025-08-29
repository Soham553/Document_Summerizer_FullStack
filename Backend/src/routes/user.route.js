import { Router } from "express";
import { registerUser, loginUser, logout } from "../controller/user.controller.js";
import { verfiyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/file.middleware.js";
import { uploadDocument } from "../controller/upload.controller.js";


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verfiyjwt ,logout)

router.route("/file").post(verfiyjwt, upload.fields([
        {
            name : "file",
            maxCount : 1
        }]),
        uploadDocument
    )


export default router;