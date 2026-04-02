import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';

import {
    signupUser,
    loginUser,
    getUserDetails,
    updateUserDetails,
    deleteUser
} from '../controllers/userController.js';

router.post("/signup", signupUser);
router.get("/login", loginUser);
router.get("/userDetails", protect, getUserDetails);
router.post("/updateUser", protect, updateUserDetails);
router.post("/deleteUser", protect, deleteUser);

export default router;