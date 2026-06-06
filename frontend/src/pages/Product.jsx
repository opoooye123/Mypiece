import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export const Product = () => {
    const {id} = useParams();

    const [product, setProducts] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const {data}= await axios.get(
                    `http://localhost:5000/api/products/${id}`
                );

                setProducts(data)
            }catch(error) {
                console.log(error);
            }
        };

        fetchProduct();
    },[id]);

    if(!product){
        return <h2>Loading.....</h2>;
    }
    const addToCart = () => {
        const cart = 
        JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(
            (item) => item._id === product._id
        );

        if(existingItem) {
            existingItem.qty += 1
        }else {
            cart.push({
                ...product,
                qty: 1
            })
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );
    };
  return (
    <>
     <h1>{product.name}</h1>
     <img
  src={product.image}
  alt={product.name}
  style={{ width: "300px", height: "300px", objectFit: "cover" }}
/>
     <p>{product.description}</p>
     <h3>{product.price}</h3>
     <p>Brand: {product.brand}</p>
     <p>Category: {product.category}</p>
     <p>Stock: {product.countInStock}</p>

     <button onClick={addToCart}>
        Add to Cart
     </button>
    </>
  )
}
