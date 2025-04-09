import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBooks, createBook } from "../adapters/bookAdapters";

const Home = () => {
  // Get all fellows from the serverstate
  const [books, setBooks] = useState([]);
  // form input state
  const [newBookName, setNewBookName] = useState("");
  // form submission response state
  const [newlyAddedBook, setNewlyAddedBook] = useState({});

  // Get me the most up to date full list of fellows
  useEffect(() => {
    const doFetch = async () => {
      const [allBooks, error] = await getAllBooks();
      setBooks(allBooks);
    };
    doFetch();
  }, [newlyAddedBook]);

  // Use the form data to create a POST request to create a new fellow
  const handleCreateBook = async (e) => {
    e.preventDefault();
    const [newBook, error] = await createBook(newBookName);
    setNewlyAddedBook(newBook);
    setNewBookName("");
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreateBook}>
        <label htmlFor="name">Add A New Book</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>
                {book.name} (Book {book.id})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
