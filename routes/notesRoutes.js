import express from "express";
import {
  createNotesController,
  deleteNotesController,
  getAllNotesController,
  getSingleNotes,
  searchNotesController,
  updateNotesController,
} from "../controllers/notesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();
// routes
// Get || all notes
router.get("/get-notes", authMiddleware, getAllNotesController);

// post || all notes
router.post("/create-notes", authMiddleware, createNotesController);
// put || all notes
router.put("/update-notes/:id", authMiddleware, updateNotesController);
// Delete || all notes
router.delete("/delete-notes/:id", authMiddleware, deleteNotesController);
// get single
router.get("/get-single/:id", authMiddleware, getSingleNotes);
// search-notes
router.get("/search/:keyword", searchNotesController);

export default router;
