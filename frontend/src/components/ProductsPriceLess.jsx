import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

function ProductsPriceLess() {
  const { value } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessProducts = async () => {
      try {
        const res = await axios.get(
          `https://mybazaar-backend.onrender.com/products/price/less/${value}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching less-price products:", err);
      }
      setLoading(false);
    };

    fetchLessProducts();
  }, [value]);

  return (
    <div className="container mt-4">
      <h3 className="text-success text-center">
        Products with Price Less Than ₹{value}
      </h3>
      <hr />
      {loading ? (
        <h5 className="text-center">Loading...</h5>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-xl-3 p-3" key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="text-dark text-decoration-none"
              >
                <div className="card p-2 border border-success product_card h-100">
                  <h5>Name: {product.name}</h5>
                  <p>
                    <b>Price:</b> ₹{product.price}<br />
                    <b>Rating:</b> {product.rating}<br />
                    <b>Company:</b> {product.company}<br />
                    <b>Created At:</b> {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
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
