const getId = require("../utils/getId");

// Restrict access to our mock "database" to just the Model
const books = [
  { name: "Fault in Our Stars", id: getId() },
  { name: "Fine Balance", id: getId() },
  { name: "War and Peace", id: getId() },
];

class Book {
  // Create and add the new book to the "database" (the books array)
  // Rather than using a constructor, we use a static method to create a new book
  static create(name) {
    const newBook = {
      name,
      id: getId(),
    };
    books.push(newBook);
    return newBook;
  }

  // Get all values from the "database"
  static list() {
    return [...books];
  }

  // Get one value from the "database"
  static find(id) {
    return books.find((book) => book.id === id);
  }

  // Update one value from the "database"
  static editName(id, newName) {
    const book = Book.find(id);
    if (!book) return null;
    book.name = newName;
    return book;
  }

  // Delete one value from the "database"
  static delete(id) {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex < 0) return false;

    books.splice(bookIndex, 1);
    return true;
  }
}

module.exports = Book;

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Book.js`:

console.log(Book.list())
console.log(Book.find(1))
console.log(Book.editName(1, 'ZO!!'))
console.log(Book.delete(2))
console.log(Book.list())
*/
