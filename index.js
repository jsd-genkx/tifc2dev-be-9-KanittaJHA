const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  setTimeout(() => {
    const { genre } = req.query;
    //TODO: ADD CODE HERE ⬇️ to Filter books by genre.
    let filteredBooks = books;

    if (genre) {
      filteredBooks = books.filter((book) =>
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      data: filteredBooks,
    });
    //TODO: ADD CODE HERE ⬇️
  }, 1000); // Simulate a 1-second delay
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  const book = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundBook = books.find((b) => b.id === parseInt(req.params.id, 10));
      if (foundBook) {
        resolve(foundBook);
      } else {
        //TODO: ADD CODE to reject the promise
        reject(new Error("Book not found"));
      }
    }, 1000); // Simulate a 1-second delay
  });

  //TODO: ADD CODE HERE ⬇️
  try {
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
});

//TODO: ADD CODE HERE ⬇️
app.use((err, req, res, next) => {
  res.status(404).json({
    success: false,
    message: err.message || "Something went wrong",
    status: 404
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});