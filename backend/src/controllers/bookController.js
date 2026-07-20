import Book from "../models/Book.js";

export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBook = async(req,res)=>{

    try{

        const book = await Book.findByIdAndUpdate(

            req.params.id,

            {

                availableCopies:req.body.availableCopies

            },

            {

                new:true

            }

        );

        res.json(book);

    }

    catch(err){

        res.status(500).json({

            message:err.message

        });

    }

}
