import { Router } from "express";

import {
	LoginUser,
	LogoutUser,
	RegisterUser,
	ResendVerificationCode,
	ResetPassword,
	VerifyEmail,
} from "../controllers/Auth.controller";

const router = Router();

router.post("/register", RegisterUser);

router.post("/login", LoginUser);

router.delete("/logout", LogoutUser);

router.post("/verify-email", VerifyEmail);

router.post("/resend-verification", ResendVerificationCode);

router.post("/reset-password", ResetPassword);

export default router;
