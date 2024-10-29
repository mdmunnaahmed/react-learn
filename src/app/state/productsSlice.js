import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await axios.get("http://localhost:3000/products");
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`http://localhost:3000/products/${id}`);
  return id;
});

export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
  const res = await axios.post(`http://localhost:3000/products/`, product);
  return res.data;
});

// Updated updateProduct thunk
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, product }) => {
  const res = await axios.put(`http://localhost:3000/products/${id}`, product);
  return res.data; // Make sure this returns the updated product
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ? action.error.message : "Failed to fetch data";
        state.products = [];
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => item.id !== action.payload);
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex((item) => item.id === updatedProduct.id);

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
  },
});

export default productSlice.reducer;
