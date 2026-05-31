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

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
      <Route path="/login" element={ <PublicRoute ><Login /></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
      <Route path="/apply-vendor" element={<VendorApply />}/>
      <Route path="/product/:id" element={<Product />}/>
      <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App