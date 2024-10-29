import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "counter",
  initialState: {
    books: [
      {
        id: 1,
        title: "The Last Journey",
        author: "Munna Ahmed",
        price: 150,
        qty: 75,
      },
      {
        id: 2,
        title: "Adventures in Coding",
        author: "Sarah Lee",
        price: 200,
        qty: 45,
      },
    ],
  },
  reducers: {
    deleteItem: (state, action) => {
      state.books = state.books.filter((item) => item.id !== action.payload);
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, title, author, price, qty } = action.payload;
      const book = state.books.find((item) => item.id === id);
      if (book) {
        book.title = title;
        book.author = author;
        book.price = price;
        book.qty = qty;
      }
    },
  },
});

export const { deleteItem, addBook, editItem } = bookSlice.actions;
export default bookSlice.reducer;
