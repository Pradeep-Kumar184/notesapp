import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

// router object
const router = express.Router();
// get-user || Get

// register-user || post
router.post("/register", registerController);
// login-user || post
router.post("/login", loginController);

export default router;
