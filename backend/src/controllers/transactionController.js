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

    transaction.status = "returned";
    transaction.returnDate = new Date();
    await transaction.save();

    res.json({ message: "Book returned successfully" });

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
