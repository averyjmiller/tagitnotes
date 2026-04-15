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

router.get("/userDetails", protect, getUserDetails);

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.patch("/updateUser", protect, updateUserDetails);

router.delete("/deleteUser", protect, deleteUser);

export default router;