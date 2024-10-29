import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./state/bookSlice";
import postSlice from "./state/postSlice";
import productSlice from './state/productsSlice';

const store = configureStore({
  reducer: {
    books: bookSlice,
    posts: postSlice,
    products: productSlice
  },
});

export default store;
