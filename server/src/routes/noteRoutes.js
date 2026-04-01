import express from 'express';
const router = express.Router();
// import { protect } from '../middleware/auth.js';

import {
    createNote,
    getNote,
    updateNote,
    deleteNote
} from '../controllers/noteController.js';

router.post("/createNote", createNote);
router.get("/getNote", getNote);
router.post("/updateNote", updateNote);
router.post("/deleteNote", deleteNote);

export default router;