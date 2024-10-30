import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./state/bookSlice";
import postSlice from "./state/postSlice";
import productSlice from "./state/productsSlice";
import { productsApi } from "./api/productApi";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    books: bookSlice,
    posts: postSlice,
    products: productSlice,
  },
});

export default store;
