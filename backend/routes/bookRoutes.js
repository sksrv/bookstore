import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks); // public
router.get("/:id", getBookById); // public
router.post("/", protect, createBook); // protected
router.put("/:id", protect, updateBook); // protected
router.delete("/:id", protect, deleteBook); // protected

export default router;