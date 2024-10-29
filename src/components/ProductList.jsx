import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../app/state/productsSlice";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector((state) => state.products);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (product) => {
    dispatch(createProduct({ ...product, id: new Date().getTime() }));
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleSaveEdit = (product) => {
    console.log("Updating product:", product); // Log the product
    dispatch(updateProduct({ id: product.id, product })); // Dispatch the update
    setIsEditing(false);
    setCurrentProduct(null);
  };
  

  return (
    <div>
      <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
      <AddProduct initialValues={isEditing ? currentProduct : null} onSubmit={isEditing ? handleSaveEdit : handleAdd} />

      <h2>List of Products</h2>
      {isLoading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {products && products.length > 0 && !isLoading && !error ? (
        <ul className="list-decimal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
          {products.map((product) => (
            <li key={product.id} className="shadow-xl p-4">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Product Category: {product.category}</p>
              <button onClick={() => dispatch(deleteProduct(product.id))}>Delete Product</button>
              <button onClick={() => handleEdit(product)}>Edit Product</button>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && !error && <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
