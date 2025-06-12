import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.password) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", result.token); // Save token
                setFormData({ username: "", password: "" });
                navigate("/products");
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong during login.");
        }

        setValidated(true);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "84vh" }}>
            <div className="bg-success-subtle p-5 border rounded border-success w-100 shadow-sm" style={{ maxWidth: "700px" }}>
                <h2 className="text-center text-success">Welcome for Log In</h2>
                <hr />
                <form
                    noValidate
                    className={`needs-validation ${validated ? "was-validated" : ""}`}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3 mt-4">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control border-dark-subtle"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your username</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            className="form-control border-dark-subtle"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your password</div>
                    </div>
                    <button type="submit" className="btn btn-outline-success w-100 mt-2">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
