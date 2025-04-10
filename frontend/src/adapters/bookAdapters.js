import handleFetch from "./handleFetch";

export const getAllBooks = async () => {
  const [allBooks, error] = await handleFetch("/api/books");
  return [allBooks, error];
};

export const getBookById = async (id) => {
  const [book, error] = await handleFetch(`/api/books/${id}`);
  return [book, error];
};

export const createBook = async (bookName) => {
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ bookName }),
  };

  const [newBook, error] = await handleFetch(`/api/books/`, options);
  return [newBook, error];
};

export const deleteBook = async (id) => {
  const options = {
    method: "DELETE",
  };
  const [success, error] = await handleFetch(`/api/books/${id}`, options);
  return [success, error];
};

export const updateBookName = async (id, bookName) => {
  const options = {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ bookName }),
  };

  const [updatedBook, error] = await handleFetch(`/api/books/${id}`, options);
  return [updatedBook, error];
};
