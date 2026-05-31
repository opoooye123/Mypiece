import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const CreateProduct = () => {
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        brand: "",
        countInStock: "",
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const userInfo = JSON.parse(
                localStorage.getItem("userInfo")
            );

            await axios.post(
                "http://localhost:5000/api/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            navigate("/dashboard")
        }catch(error){
            console.log("ERROR:", error);
console.log("RESPONSE:", error.response);
console.log("DATA:", error.response?.data);
        }
    };

  return (
    <>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>

        <input name='name'
         placeholder='Product Name' 
         onChange={handleChange}
         />

         <input name='description'
         placeholder='Description' 
         onChange={handleChange}
         />

         <input name='price'
         placeholder='Price'
         onChange={handleChange} 
         />

         <input name='image' 
         placeholder='Image URL'
         onChange={handleChange}
         />

        <input name='category'
        placeholder='Category'
        onChange={handleChange}
         />

         <input name='brand'
          placeholder='Brand'
          onChange={handleChange}
          />

          <input name='countInStock'
          placeholder='Stock'
          onChange={handleChange}
           />

           <button type='submit'>
            Create Product
           </button>
      </form>
    </>
  )
}
