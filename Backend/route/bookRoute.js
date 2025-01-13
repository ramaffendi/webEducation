import express from "express";
import {
  getBook,
  postBook,
  getBookById,
} from "../controller/bookController.js";

const router = express.Router();

router.get("/", getBook);
router.get("/:id", getBookById);

router.post("/post", postBook);

export default router;
