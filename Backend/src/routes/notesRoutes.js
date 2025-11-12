import express from "express";
import tokenVerification from '../middlewares/tokenVerification.js';
import deleteNotes from "../controllers/notes/deleteNotes.js";
import getNotes from "../controllers/notes/getNotes.js";
import postNotes from "../controllers/notes/postNotes.js";
import updateNotes from "../controllers/notes/updateNotes.js";
// Router Method
const router = express.Router();

router.put("/notes/:id", tokenVerification, updateNotes);
router.delete("/notes/:id", tokenVerification, deleteNotes);
router.post("/notes", tokenVerification, postNotes);
router.get("/notes", tokenVerification, getNotes);

export default router;
