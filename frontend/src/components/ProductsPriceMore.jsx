import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";


function ProductsPriceMore() {
  const { value } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        const res = await axios.get(`https://mybazaar-backend.onrender.com/products/price/more/${value}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching more-price products:", err);
      }
      setLoading(false);
    };

    fetchMoreProducts();
  }, [value]);

  return (
    <div className="container mt-5">
      <h3 className="text-success text-center">Products with Price More Than ₹{value}</h3>
      <hr />
      {loading ? (
        <h5 className="text-center">Loading...</h5>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <Link to={`/products/${product._id}`} className="text-dark text-decoration-none">
              <div className="col-md-4 mb-3 product_card" key={product._id}>
                <div className="card p-3 border border-success">
                  <h5>Name: {product.name}</h5>
                  <p><b>Price:</b> ₹{product.price}</p>
                  <p><b>Rating:</b> {product.rating}</p>
                  <p><b>Company:</b> {product.company}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h6 className="text-center">No products found</h6>
      )}
    </div>
  );
}

export default ProductsPriceMore;
