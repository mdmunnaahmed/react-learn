import { useState, useEffect } from "react";

const BookForm = ({ initialValues = null, onSubmit }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    qty: "",
  });

  // Load initial values if in edit mode
  useEffect(() => {
    if (initialValues) {
      setBook(initialValues);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book);
    setBook({ title: "", author: "", price: "", qty: "" }); // Reset form after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" required onChange={handleChange} value={book.title} placeholder="Book Title" />
      <input type="text" name="author" required onChange={handleChange} value={book.author} placeholder="Author Name" />
      <input type="number" name="price" required onChange={handleChange} value={book.price} placeholder="Price" />
      <input type="number" name="qty" required onChange={handleChange} value={book.qty} placeholder="Quantity" />
      <button type="submit">{initialValues ? "Save Changes" : "Add Book"}</button>
    </form>
  );
};

export default BookForm;
