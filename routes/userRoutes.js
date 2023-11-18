import express from "express";
import { getAllUsers, loginController, registerController } from "../controllers/userControllers.js";

const router = express.Router();

// GET ALL USER || GET
router.get('/all-users',getAllUsers);

// REGISTER A USER || POST
router.post('/register',registerController);

// LOGIN USER || POST
router.post('/login',loginController);


export default router;