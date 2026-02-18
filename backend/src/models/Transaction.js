import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    returnDate: Date,
    status: {
      type: String,
      enum: ["issued", "returned"],
      default: "issued"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
