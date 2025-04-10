import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getBookById,
  updateBookName,
  deleteBook,
} from "../adapters/bookAdapters";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [newBookName, setNewBookName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // on load, get the fellow by id
  useEffect(() => {
    const doFetch = async () => {
      const [foundBook, error] = await getBookById(id);
      setBook(foundBook);
    };
    doFetch();
  }, []);

  // when the delete button is pressed, send a DELETE request
  const handleDeleteBook = async () => {
    await deleteBook(id);
    navigate("/");
  };

  // when the form is filled out, send a PATCH request
  const handleUpdateBook = async (e) => {
    e.preventDefault();

    const [updatedBook, error] = await updateBookName(id, newBookName);
    setBook(updatedBook);

    setNewBookName("");
  };

  return (
    <>
      <Link to="/">Go Home</Link>
      <h1>Book Details</h1>
      <p>Name: {book.name}</p>
      <p>Id: {book.id}</p>
      <form onSubmit={handleUpdateBook}>
        <label htmlFor="name">Update Book Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newBookName}
          onChange={(e) => setNewBookName(e.target.value)}
          placeholder="New Name"
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteBook} className="danger">
        Delete Book
      </button>
    </>
  );
};

export default BookDetails;
