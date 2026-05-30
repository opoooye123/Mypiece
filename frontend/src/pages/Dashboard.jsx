import React from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login")
  }
  return (
    <>
     <h1>Dashboard</h1>

     <h3>Welcome, {user?.name}</h3>


     <p>Email: {user?.email}</p>
     <p>Role: {user?.role}</p>

     <button onClick={handleLogout}>
      Logout
     </button>
    </>
  )
}

export default Dashboard