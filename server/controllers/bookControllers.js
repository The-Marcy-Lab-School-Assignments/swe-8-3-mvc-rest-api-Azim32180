const Book = require("../model/Book");

/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const serveBooks = (req, res) => {
  const booksList = Book.list();
  res.send(booksList);
};

// Get One (Read)
const serveBook = (req, res) => {
  const { id } = req.params;
  const book = Book.find(Number(id));

  if (!book) {
    return res.status(404).send({
      message: `No book with the id ${id}`,
    });
  }
  res.send(book);
};

// Create
const createBook = (req, res) => {
  const { bookName } = req.body;
  if (!bookName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const newBook = Book.create(bookName);
  res.send(newBook);
};

// Update
const updateBook = (req, res) => {
  const { bookName } = req.body;

  if (!bookName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const { id } = req.params;
  const updatedBook = Book.editName(Number(id), bookName);

  if (!updatedBook) {
    return res.status(404).send({
      message: `No book with the id ${id}`,
    });
  }

  res.send(updatedBook);
};

// Delete
const deleteBook = (req, res) => {
  const { id } = req.params;
  const didDelete = Book.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No book with the id ${id}`,
    });
  }

  res.sendStatus(204);
};

module.exports = {
  serveBooks,
  serveBook,
  createBook,
  updateBook,
  deleteBook,
};
