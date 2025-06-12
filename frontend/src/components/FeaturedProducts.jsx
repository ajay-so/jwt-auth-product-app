import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await axios.get("https://mybazaar-backend.onrender.com/products/featured");
                let dataArray = [];

                if (res.data && Array.isArray(res.data.data)) {
                    dataArray = res.data.data;
                }
                setFeaturedProducts(dataArray);
            } catch (err) {
                console.error("Error fetching featured products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    if (loading) {
        return <h3 className="text-center text-success mt-4">Loading...</h3>;
    }

    if (!featuredProducts.length) {
        return <h3 className="text-center text-danger mt-4">No Featured Products Available</h3>;
    }

    return (
        <div className="container">
            <h3 className="text-center mb-4 text-success mt-4">Featured Products</h3>
            <hr />
            <div className="row">
                {featuredProducts.map((product, index) => (
                    <div className="col-12 col-sm-6 col-md-4 col-xl-3 p-3" key={product._id || index}>
                        <Link to={`/products/${product._id}`} className="text-dark text-decoration-none">
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
        </div>
    );
}

export default FeaturedProducts;
