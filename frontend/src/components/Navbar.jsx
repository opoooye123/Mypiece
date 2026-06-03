import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate();

    const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
    );

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    }
  return (
    <nav style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid #cc",
    }}>
        <Link to="/">Home</Link>

        {!userInfo ?  (
            <>
             <Link to="/login">Login</Link>
             <Link to="/register">Register</Link>
            </>
        ) : (
            <>
             {userInfo.role === "vendor" && (
                <Link to="/dashboard">
                   Dashboard
                </Link>
             )}

             <button onClick={logoutHandler}>
                Logout
             </button>

             <Link to="/cart">Cart</Link>
            </>
        )}

    </nav>
  )
}
