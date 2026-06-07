import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export const Product = () => {
    const {id} = useParams();

    const [product, setProducts] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

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

    const submitReview = async () => {
         if (!comment.trim()) {
    alert(
      "Please enter a review"
    );
    return;
  }
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    await axios.post(
      `http://localhost:5000/api/products/${id}/reviews`,
      {
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Review submitted!");

    window.location.reload();

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Review failed"
    );
  }
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

     <p>
  Rating: {product.rating || 0}
</p>

<p>
  Reviews: {product.numReviews || 0}
</p>

     <button onClick={addToCart}>
        Add to Cart
     </button>

     <hr />

<h3>Leave a Review</h3>

<div>
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      style={{
        cursor: "pointer",
        fontSize: "30px",
      }}
      onClick={() =>
        setRating(star)
      }
    >
      {star <= rating
        ? "⭐"
        : "☆"}
    </span>
  ))}
</div>

<br /><br />

<textarea
  placeholder="Write review..."
  value={comment}
  onChange={(e) =>
    setComment(e.target.value)
  }
/>

<br /><br />

<button onClick={submitReview}>
  Submit Review
</button>


<hr />

<h3>Reviews</h3>

{product.reviews?.length === 0 ? (
  <p>No reviews yet</p>
) : (
  product.reviews.map(
    (review, index) => (
      <div
        key={index}
        style={{
          border:
            "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      >
        <h4>{review.name}</h4>

        <p>
          {"⭐".repeat(
            review.rating
          )}
        </p>

        <p>
          {review.comment}
        </p>
      </div>
    )
  )
)}
    </>
  )
}
