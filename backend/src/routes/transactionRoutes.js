import express from "express";
import { 
  issueBook, 
  returnBook, 
  getStudentTransactions 
} from "../controllers/transactionController.js";


const router = express.Router();

router.post("/issue", issueBook);
router.post("/return", returnBook);
router.get("/student/:studentId", getStudentTransactions);

export default router;
