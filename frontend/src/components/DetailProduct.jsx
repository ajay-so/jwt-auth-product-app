// DetailProduct.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

function DetailProduct() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [product, setProduct] = useState({
        name: "",
        price: "",
        rating: "",
        createdAt: "",
        company: ""
    });

    // Fetch product details
    useEffect(() => {
        axios
            .get(`https://jwt-auth-product-app.onrender.com/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    // Handle delete with token check
    const handleDelete = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please sign up first.");
            navigate("/auth/signup");
            return;
        }

        axios
            .delete(`https://jwt-auth-product-app.onrender.com/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                alert("Product deleted successfully!");
                navigate("/products"); 
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete product. Please ensure you are logged in.");
            });
    };

    // Handle navigate to update with token check
    const handleUpdate = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: Please sign up first.");
            navigate("/auth/signup");
            return;
        }
        navigate(`/products/update/${id}`);
    };

    return (
        <div className="container">
            <h3 className="text-center mb-4 text-success mt-4">Product Details</h3>
            <hr />
            <div className="row">
                <div className="col-4 offset-4 mt-4">
                    <div className="card-body border border-success rounded shadow-sm">
                        <p className="card-text p-4">
                            <h4><b>Name:</b> {product.name}</h4>
                            <b>Price:</b> ${product.price} <br />
                            <b>Rating:</b> {product.rating} <br />
                            <b>Created At:</b> {new Date(product.createdAt).toLocaleDateString()} <br />
                            <b>Company:</b> {product.company}
                        </p>
                        <div className="mt-2 p-2">
                            <button onClick={handleUpdate} className="btn btn-success w-100">Update</button><br />
                            <button onClick={handleDelete} className="btn btn-danger w-100 mt-3">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
