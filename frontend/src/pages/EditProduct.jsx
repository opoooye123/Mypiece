import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        description: "",
        price:"",
        image:"",
        category:"",
        brand:"",
        countInStock:"",
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/products/${id}`
                );

                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    image: data.image,
                    category: data.category,
                    brand: data.brand,
                    countInStock:data.countInStock,
                });
            }catch(error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo = JSON.parse(
                localStorage.getItem("userInfo")
            );

            await axios.put(
                `http://localhost:5000/api/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            navigate("/dashboard")
        }catch(error) {
            console.log(error.response?.data);
        }
    };
  return (
    <>
      <h1>Edit Product</h1>


      <form onSubmit={handleSubmit}>

        <input name='name'
        value={formData.name}
        onChange={handleChange} 
        />

        <input name='description'
        value={formData.description} 
        onChange={handleChange}
        />

        <input name='price'
        value={formData.price}
        onChange={handleChange}
         />

         <input name='image'
         value={formData.image}
         onChange={handleChange}
          />

          <input name='category'
          value={formData.category}
          onChange={handleChange}
           />

           <input name='brand'
           value={formData.brand}
           onChange={handleChange} 
           />

           <input name='countInStock' 
           value={formData.countInStock}
           onChange={handleChange}
            />

            <button type='submit'>
                Update Products
            </button>
      </form>
    </>
  )
}
