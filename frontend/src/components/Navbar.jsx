import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "null"
    );

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "16px 0",
        }}>
            <div style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                
                {/* Logo */}
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{
                        fontSize: "clamp(24px, 5.5vw, 28px)",
                        fontWeight: "800",
                        letterSpacing: "-1.5px",
                    }}>
                        UNDER<span style={{ color: "#ef4444" }}>VOID</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div style={{
                    display: "none",
                    alignItems: "center",
                    gap: "28px",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    fontWeight: "500",
                    "@media (min-width: 768px)": { display: "flex" } // This won't work inline, so we use JS below
                }} className="desktop-menu">
                    {/* We'll handle responsive with state instead */}
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    onClick={toggleMenu}
                    style={{
                        display: "block",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "28px",
                        cursor: "pointer",
                        padding: "4px",
                        zIndex: 60,
                    }}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            position: "fixed",
                            top: "70px",
                            left: 0,
                            right: 0,
                            backgroundColor: "#000",
                            padding: "30px 20px",
                            zIndex: 55,
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            fontSize: "16px",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}
                    >
                        <Link to="/" style={{ color: "#ddd", textDecoration: "none", padding: "8px 0" }} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>

                        {!userInfo ? (
                            <>
                                <Link to="/login" style={{ color: "#ddd", textDecoration: "none", padding: "8px 0" }} onClick={() => setIsMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/register" style={{ color: "#ddd", textDecoration: "none", padding: "8px 0" }} onClick={() => setIsMenuOpen(false)}>
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                {userInfo.role === "vendor" && (
                                    <Link to="/dashboard" style={{ color: "#ddd", textDecoration: "none", padding: "8px 0" }} onClick={() => setIsMenuOpen(false)}>
                                        Dashboard
                                    </Link>
                                )}
                                <Link to="/cart" style={{ color: "#ddd", textDecoration: "none", padding: "8px 0" }} onClick={() => setIsMenuOpen(false)}>
                                    Cart
                                </Link>
                                <button 
                                    onClick={logoutHandler}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#ef4444",
                                        textAlign: "left",
                                        padding: "8px 0",
                                        fontSize: "16px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        <Link 
                            to="/apply-vendor" 
                            style={{
                                backgroundColor: "#ef4444",
                                color: "#fff",
                                padding: "14px 24px",
                                borderRadius: "50px",
                                textDecoration: "none",
                                textAlign: "center",
                                fontWeight: "600",
                                marginTop: "10px"
                            }}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            List Your Brand
                        </Link>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};