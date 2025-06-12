import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductsPriceLess() {
  const { value } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessProducts = async () => {
      try {
        const res = await axios.get(`https://mybazaar-backend.onrender.com/products/price/less/${value}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching less-price products:", err);
      }
      setLoading(false);
    };

    fetchLessProducts();
  }, [value]);

  return (
    <div className="container mt-5">
      <h3 className="text-success text-center">Products with Price Less Than ₹{value}</h3>
      {loading ? (
        <h5 className="text-center">Loading...</h5>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-3" key={product._id}>
              <div className="card p-3 border border-success">
                <h5>{product.name}</h5>
                <p><b>Price:</b> ₹{product.price}</p>
                <p><b>Rating:</b> {product.rating}</p>
                <p><b>Company:</b> {product.company}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h6 className="text-center">No products found</h6>
      )}
    </div>
  );
}

export default ProductsPriceLess;
