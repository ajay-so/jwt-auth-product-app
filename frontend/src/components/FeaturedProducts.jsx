import React, { useState, useEffect } from "react";
import axios from "axios";

function FeaturedProducts() {
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:3000/products/featured")
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setFeaturedProduct(res.data[0]); // Taking first product if array
                } else {
                    setFeaturedProduct(res.data); // Assuming it's an object
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h3 className="text-center text-success mt-4">Loading...</h3>;
    }

    if (!featuredProduct) {
        return <h3 className="text-center text-danger mt-4">No Featured Products Available</h3>;
    }

    return (
        <div className="container">
            <h3 className="text-center mb-4 text-success mt-4">Featured Product</h3>
            <hr />
            <div className="row">
                <div className="col-4 offset-4 mt-4">
                    <div className="card-body border border-success rounded shadow-sm p-3">
                        <h4><b>Name:</b> {featuredProduct.name}</h4>
                        <b>Price:</b> ${featuredProduct.price} <br />
                        <b>Rating:</b> {featuredProduct.rating} <br />
                        <b>Created At:</b> {new Date(featuredProduct.createdAt).toLocaleDateString()} <br />
                        <b>Company:</b> {featuredProduct.company}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;
