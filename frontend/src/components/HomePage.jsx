import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./index.css";

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://jwt-auth-product-app.onrender.com/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h3 className="text-center mb-4 text-success mt-4">All Products</h3>
            <hr />
            <div className="row">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index} className="col-12 col-sm-6 col-md-4 col-xl-3 p-3">
                            <Link to={`/products/${product._id}`} className="text-dark text-decoration-none">
                                <div className="card-body border border-success rounded shadow-sm product_card p-2">
                                    <p className="card-text p-2">
                                        <h5><b>Name:</b> {product.name}</h5>
                                        <b>Price:</b> ${product.price} <br />
                                        <b>Rating:</b> {product.rating} <br />
                                        <b>Created At:</b> {new Date(product.createdAt).toLocaleDateString()} <br />
                                        <b>Company:</b> {product.company}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Loading products...</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
