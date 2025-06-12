import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        alert("You have been logged out");
        navigate("/auth/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <b className="text-success">MyBazaar</b>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/newProduct">Create New Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/featured">Featured</Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signup"><b>Sign Up</b></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login"><b>Log In</b></Link>
                                </li>
                            </>
                        )}

                        {isLoggedIn && (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link text-danger" onClick={handleLogout}><b>Log Out</b></button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
