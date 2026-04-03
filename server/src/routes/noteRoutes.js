import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';

import {
    createNote,
    getNoteDetails,
    getUserNotes,
    searchByTag,
    getTopTags,
    updateNoteDetails,
    deleteNote
} from '../controllers/noteController.js';

router.get("/noteDetails", protect, getNoteDetails);
router.get("/userNotes", protect, getUserNotes);
router.get("/searchByTag", protect, searchByTag);
router.get("/tags", protect, getTopTags);

router.post("/createNote", protect, createNote);

router.patch("/updateNote", protect, updateNoteDetails);

router.delete("/deleteNote", protect, deleteNote);

export default router;