
// Required imports
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const Book = require("./database/models/bookSchema");

// Establishinging a connection with mongodb server -> hosted in Atlas
connectDB();

const app = express();

// Default CORS configuration for development
app.use(cors());

// Using body-parser -> can access req.body directly
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// default route
app.get("/", (_,res) => {
    res.send("Express server has been setup for Vercel!");
});

// GET -> Returns all books
app.get("/books", async (_, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({ success: true, message: "Books fetched successfully", books });
    } catch (err) {
        console.error("An error occured while fetching books =", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST -> Add new book
app.post("/books", async(req, res) => {
    try {
        const { title, author, price, publishedDate } = req.body;

        if (!title || typeof title !== "string") {
          return res
            .status(400)
            .json({ error: "Title is required and must be a string." });
        }
        if (!author || typeof author !== "string") {
          return res
            .status(400)
            .json({ error: "Author is required and must be a string." });
        }
        if (price === undefined || typeof price !== "number" || price < 0) {
          return res
            .status(400)
            .json({
              error: "Price is required and must be a positive number.",
            });
        }
        if (!publishedDate || isNaN(Date.parse(publishedDate))) {
          return res
            .status(400)
            .json({
              error: "Published date is required and must be a valid date.",
            });
        }

        const existingBook = await Book.findOne({ title: title, author: author, publishedDate, publishedDate });

        if (existingBook) {
          return res
            .status(400)
            .json({ success: false, message: "Book already exists!" });
        }

        const newBook = new Book({
            title,
            author,
            price,
            publishedDate
        });

        const savedBook = await newBook.save();

        res.status(200).json({ success: true, message: "New book has been added successfully", savedBook });
    } catch (err) {
        console.error("An error occured while adding a new book =", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// PUT -> Update existing book
app.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ success: false, message: "Id not provided" });
        }

        const { title, author, price, publishedDate } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, price, publishedDate },
            { new: true, runValidators: true }
        );

        if(!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found!" });
        }

        return res.status(200).json({ success: true, message: "Book Updated Successful", updatedBook });
    } catch (err) {
        console.error("An error occured while updating book information =", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE -> delete book with id
app.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ success: false, message: "Id not provided" });
        }

        const bookRes = await Book.findByIdAndDelete(id);

        if(!bookRes) {
            return res.status(404).json({ success: false, message: "Book not found!" });
        }

        return res.status(200).json({ success: true, message: "Book deleted successfully!" });
    } catch (err) {
        console.error("An error occured while deleting book =", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});