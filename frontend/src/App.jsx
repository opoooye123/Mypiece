import {Routes,BrowserRouter,Route} from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login";
import  Register from "./pages/Register";
import VendorApply from "./pages/VendorApply";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { Product } from "./pages/Product";
import { CreateProduct } from "./pages/CreateProduct";
import { EditProduct } from "./pages/EditProduct";
import { Navbar } from "./components/Navbar";
import { Cart } from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import VendorOrders from "./pages/VendorOrder";
import AdminRoute from "./components/AdminRoute";
import AdminUsers from "./pages/AdminUsers";
import ApplyVendor from "./pages/ApplyVendor";
import AdminApplications from "./pages/AdminApplication";
import Admin from "./pages/Admin";



function App(){
  return(
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route path="/login" element={ <PublicRoute ><Login /></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
      <Route path="/product/:id" element={<Product />}/>
      <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>}/>
      <Route path="/edit-product/:id" element={<EditProduct />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
      <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>}/>
      <Route path="/vendor-orders" element={<PrivateRoute><VendorOrders /></PrivateRoute>}/>
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>}/>
      <Route path="/apply-vendor" element={<PrivateRoute><ApplyVendor /></PrivateRoute>}/>
      <Route path="/admin/applications" element={<AdminRoute><AdminApplications /></AdminRoute>}/>
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App