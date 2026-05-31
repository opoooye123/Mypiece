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
  return (
    <>
     <h1>{product.name}</h1>
     <p>{product.description}</p>
     <h3>{product.price}</h3>
     <p>Brand: {product.brand}</p>
     <p>Category: {product.category}</p>
     <p>Stock: {product.countInStock}</p>
    </>
  )
}
