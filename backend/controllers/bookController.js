import Book from "../models/Book.js";


const validateBook = (body) => {
  const { title, author, description, price, category } = body;

  if (!title || !author || !description || !category || price === undefined || price === "") {
    return "Please fill all required fields";
  }
  if (isNaN(price) || Number(price) < 0) {
    return "Price must be a valid number";
  }
  return null;
};

// GET /api/books (public)
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/books/:id (public)
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/books (protected)
export const createBook = async (req, res) => {
  try {
    const errorMessage = validateBook(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    const { title, author, description, price, category, image } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      image,
      createdBy: req.userId, 
    });

    res.status(201).json({ message: "Book created", book });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/books/:id (protected, owner only)
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Ownership check: compare the creator's id with the logged-in user's id
    if (book.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only edit your own books" });
    }

    const errorMessage = validateBook(req.body);
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;
    book.price = req.body.price;
    book.category = req.body.category;
    book.image = req.body.image;

    const updatedBook = await book.save();

    res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/books/:id (protected, owner only)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own books" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};