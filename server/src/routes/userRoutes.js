import express from 'express';
const router = express.Router();
// import { protect } from '..middleware/auth.js';

import {
    signupUser,
    loginUser,
    // getUser,
    // updateUser,
    // deleteUser
} from '../controllers/userController.js';

router.post("/signup", signupUser);
router.post("/login", loginUser);
// router.get("/userDetails", protect, getUser);
// router.post("/updateUser", protect, updateUser);
// router.post("/deleteUser", protect, deleteUser);

export default router;