import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {data} = await axios.get(
          "http://localhost:5000/api/products"
        );
            console.log(data);
        setProducts(data)
      }catch(error){
         console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return (
     <> 
      <h1>Marketplace</h1>

      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <h3>{product.name}</h3>
          </Link>
          
          {product.image && (
  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "150px",
      height: "150px",
      objectFit: "cover",
    }}
  />
)}
          <p>{product.description}</p>

          <p>{product.price}</p>

          <p>{product.brand}</p>

          <hr />
        </div>
      ))}
     </>
  )
}


export default Home