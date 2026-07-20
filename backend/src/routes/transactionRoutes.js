import express from "express";
import { 
  issueBook, 
  returnBook, 
  getStudentTransactions, 
  imposeFine,
  payFine,
  getAllTransactions
} from "../controllers/transactionController.js";


const router = express.Router();

router.post("/issue", issueBook);
router.post("/return", returnBook);
router.post("/fine", imposeFine);
router.post("/pay-fine", payFine);
router.get("/", getAllTransactions);
router.get("/student/:studentId", getStudentTransactions);

export default router;
