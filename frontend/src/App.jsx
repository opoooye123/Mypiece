import {Routes,BrowserRouter,Route} from "react-router-dom"

import Home from "./pages/Home";
import Login from "./pages/Login";
import  Register from "./pages/Register";
import VendorApply from "./pages/VendorApply";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/apply-vendor" element={<VendorApply />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App