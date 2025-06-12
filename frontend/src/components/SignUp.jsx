import React, { useState } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                setFormData({ username: "", email: "", password: "" });
                navigate("/auth/login");
            } else {
                alert(result.message || "Registration failed. Try with a different email or username.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong while registering.");
        }

        setValidated(true);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "84vh" }}>
            <div className="bg-success-subtle border border-success rounded w-100 p-5 shadow-sm" style={{ maxWidth: "700px" }}>
                <h2 className="text-center text-success">Welcome for Sign Up</h2>
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
                            placeholder="Enter your username"
                            className="form-control border-dark-subtle"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter a username</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Gmail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="form-control border-dark-subtle"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter your email</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="form-control border-dark-subtle"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter a password</div>
                    </div>
                    <button type="submit" className="btn btn-outline-success w-100 mt-2">Sign Up</button>

                    <div className="text-center mt-3">
                        Already have an account? <Link to="/auth/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
