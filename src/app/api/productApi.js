import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: "Product", id })) : [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: `products/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

// Export hooks for the queries and mutations
export const { useGetProductsQuery, useDeleteProductMutation, useAddProductMutation } = productsApi;
