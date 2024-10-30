import { useEffect, useState } from "react";

const AddProduct = ({ initialValues = null, onSubmit }) => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (initialValues) {
      setProduct(initialValues); // Populate form with current product data
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product); // Pass the product object to the parent
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mb-16">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={product.title} />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={product.price} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} value={product.category} />
        <button type="submit">{initialValues ? "Save Changes" : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProduct;
