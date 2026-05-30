import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate();

  const [login,setLogin] = useState({
    email: "",
    password:"",
  });

  const handleChange = e => {
    setLogin({
      ...login, [e.target.name]: e.target.value,
    });
  }
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          login
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data)
        );

        navigate("/");
      }catch (error) {
        console.log(error.response?.data);
      }
    }
  return (
    <>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder='Email' onChange={handleChange} />

        <input type="password" name="password" placeholder='Password' onChange={handleChange} />

        <button type='submit'>
          Login
        </button>
      </form>
    </>
  )
}

export default Login