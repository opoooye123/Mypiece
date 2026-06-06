import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Upload image to backend
  const uploadImage = async (file) => {
    const dataForm = new FormData();
    dataForm.append("image", file);

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const { data } = await axios.post(
      "http://localhost:5000/api/products/upload",
      dataForm,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data.imageUrl;
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const url = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: url,
      }));
    } catch (error) {
      console.log("Image upload error:", error);
    }
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );
      console.log(formData);

      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.log("ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
    }
  };

  return (
    <>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={handleImageChange}
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />

        <input
          name="countInStock"
          placeholder="Stock"
          onChange={handleChange}
        />

        <button type="submit">
          Create Product
        </button>
      </form>
    </>
  );
};