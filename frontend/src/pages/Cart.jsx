import React, { useState } from "react";
import { Link } from "react-router-dom";


export const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item._id !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={Math.random()}>
            <h3>{item._id}</h3>

            <p>₦{item.price}</p>

            <p>Quantity: {item.qty}</p>

            <button
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>

      <h2>Total: ₦{total}</h2>
    </>
  );
};