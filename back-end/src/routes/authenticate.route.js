import express from "express";
import RegisterUserCtrlPost from "../controllers/register.controller.js";
import LoginUserCtrlPost from "../controllers/login.controller.js";
import LogoutUserCtrl from "../controllers/logout.controller.js";
const router = express.Router();

router.post( "/register", RegisterUserCtrlPost );
router.post( "/login", LoginUserCtrlPost );
router.get( "/logout", LogoutUserCtrl );

export default router;