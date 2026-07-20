import express from "express";
import { addBook, getBooks, updateBook } from "../controllers/bookController.js";

const router = express.Router();

router.post("/add", addBook);
router.get("/", getBooks);
router.put("/:id", updateBook);

export default router;
