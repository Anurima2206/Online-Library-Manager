import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
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
    },

    fine: {
      type: Number,
      default: 0
    },

    finePaid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);