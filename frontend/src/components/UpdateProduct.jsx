import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        featured: "",
        rating: "",
        createdAt: new Date().toLocaleDateString(),
        company: ""
    });

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);

        // Redirect if not logged in
        if (!token) {
            alert("Unauthorized: Please log in first.");
            navigate("/auth/login");
            return;
        }

        // Fetch product details
        axios
            .get(`https://jwt-auth-product-app.onrender.com/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
                alert("Failed to fetch product. You may not be authorized.");
                navigate("/products");
            });
    }, [id, navigate]);

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please log in first.");
            navigate("/auth/login");
            return;
        }

        if (!formData.name || !formData.price || !formData.rating || !formData.company) {
            alert("Please fill all required fields before submitting.");
            return;
        }

        try {
            const response = await axios.patch(
                `http://localhost:3000/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                alert("Product updated successfully!");
                setValidated(true);
                navigate("/products");
            } else {
                alert("Error updating the product. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <h4 className="text-success">Loading product details...</h4>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 mb-5" style={{ minHeight: "90vh" }}>
            <div className="border border-success bg-success-subtle rounded p-5 shadow-sm w-100" style={{ maxWidth: "700px" }}>
                <h3 className="text-center text-success">Update Product</h3>
                <hr />
                <form noValidate className={`needs-validation ${validated ? "was-validated" : ""}`} onSubmit={handleSubmit}>
                    <div className="mb-3 mt-4">
                        <label htmlFor="title" className="form-label">Name:</label>
                        <input
                            type="text"
                            id="title"
                            name="name"
                            value={formData.name}
                            placeholder="Enter product name"
                            className="form-control border-dark-subtle"
                            onChange={handleInputs}
                            required
                        />
                        <div className="invalid-feedback">Please enter the name of the product</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="featured" className="form-label">Featured:</label>
                        <select
                            id="featured"
                            name="featured"
                            value={formData.featured}
                            className="form-control border-dark-subtle"
                            onChange={handleInputs}
                        >
                            <option value="">Select</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter the price"
                            value={formData.price}
                            className="form-control border-dark-subtle"
                            onChange={handleInputs}
                            required
                        />
                        <div className="invalid-feedback">Please enter a valid price</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating:</label>
                        <input
                            id="rating"
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={formData.rating}
                            className="form-control border-dark-subtle"
                            onChange={handleInputs}
                            placeholder="Enter rating between 1 to 5"
                            required
                        />
                        <div className="invalid-feedback">Please enter a rating between 1 and 5</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="company" className="form-label">Company:</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            placeholder="Enter the name of the company"
                            className="form-control border-dark-subtle"
                            onChange={handleInputs}
                            required
                        />
                        <div className="invalid-feedback">Please enter the company name</div>
                    </div>

                    <button type="submit" className="btn btn-outline-success mt-2 w-100">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
