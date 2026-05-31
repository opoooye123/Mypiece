import React from 'react'
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios"

const Register = () => {

  const navigate =  useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try{
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );

    //save user and token
    localStorage.setItem(
      "userInfo",
      JSON.stringify(res.data)
    );

   if(user.role === "vendor"){
    navigate("/dashboard");
   }else{
    navigate("/");
   }
  } catch(error){
    console.log(error)
    console.log(error.respnse.data)
  }
  }

  return (
    <>
     <h1>Register</h1>

     <form onSubmit={handleSubmit}>

      <input type="text" name="name" placeholder='Name' onChange={handleChange} />

      <input type="password" 
       name='password'
       placeholder='Password'
       onChange={handleChange}
      />

      <input type="email" name='email' placeholder='email'  onChange={handleChange} />

      <button type='submit'>
        Register
      </button>
     </form>
    
    </>
  )
}

export default Register