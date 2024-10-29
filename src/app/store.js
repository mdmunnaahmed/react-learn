import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./state/bookSlice";
import postSlice from "./state/postSlice";

const store = configureStore({
  reducer: {
    books: bookSlice,
    posts: postSlice,
  },
});

export default store;
