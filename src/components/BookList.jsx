import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteItem, editItem, addBook } from "../app/state/bookSlice";
import BookForm from "./BookForm";

const BookList = () => {
  const books = useSelector((state) => state.books.books) || [];
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleAdd = (book) => {
    dispatch(addBook({ ...book, id: new Date().getTime() })); // Add unique ID
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const handleSaveEdit = (book) => {
    dispatch(editItem(book));
    setIsEditing(false);
    setCurrentBook(null);
  };

  return (
    <div>
      <h1>List of Books</h1>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id} className="border-b py-4">
              Book Name: {book.title} <br />
              by {book.author}
              <br />
              Book Price: {book.price}
              <br />
              Book Quantity: {book.qty}
              <br />
              <button onClick={() => handleDelete(book.id)}>Delete Book</button>
              <button onClick={() => handleEdit(book)}>Edit Book</button>
            </li>
          ))
        ) : (
          <li>No books found</li>
        )}
      </ul>

      <h2>{isEditing ? "Edit Book" : "Add New Book"}</h2>
      <BookForm initialValues={isEditing ? currentBook : null} onSubmit={isEditing ? handleSaveEdit : handleAdd} />
    </div>
  );
};

export default BookList;
