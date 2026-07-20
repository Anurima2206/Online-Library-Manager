import Transaction from "../models/Transaction.js";
import Book from "../models/Book.js";

export const issueBook = async (req, res) => {
  try {
    const { studentId, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book)
      return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies <= 0)
      return res.status(400).json({ message: "No copies available" });

    book.availableCopies -= 1;
    await book.save();

    const transaction = await Transaction.create({
      student: studentId,
      book: bookId
    });

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    if (transaction.status === "returned")
      return res.status(400).json({ message: "Book already returned" });

    const book = await Book.findById(transaction.book);

    if (!book)
      return res.status(404).json({ message: "Book not found" });

    // Increase available copies
    book.availableCopies += 1;
    await book.save();

    transaction.status = "returned";
    transaction.returnDate = new Date();

    transaction.fine = 0;
    transaction.finePaid = true;

    await transaction.save();

    // Optional (if using fine)
    transaction.fine = 0;
    transaction.finePaid = true;

    await transaction.save();

    res.json({
      message: "Book returned successfully",
      transaction
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentTransactions = async (req, res) => {
  try {
    const { studentId } = req.params;

    const transactions = await Transaction.find({ student: studentId })
      .populate("book");

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const imposeFine = async (req, res) => {
  try {
    const { transactionId, fineAmount } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    if (transaction.status === "returned") {
      return res.status(400).json({
        message: "Cannot impose fine on a returned book"
      });
    }

    transaction.fine = fineAmount;
    transaction.finePaid = false;

    await transaction.save();

    res.status(200).json({
      message: "Fine imposed successfully",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const payFine = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    if (transaction.fine === 0) {
      return res.status(400).json({
        message: "No fine to pay"
      });
    }

    transaction.finePaid = true;

    await transaction.save();

    res.status(200).json({
      message: "Fine paid successfully",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllTransactions = async(req,res)=>{

    try{

        const transactions = await Transaction.find()

        .populate("student")

        .populate("book");

        res.json(transactions);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

}
