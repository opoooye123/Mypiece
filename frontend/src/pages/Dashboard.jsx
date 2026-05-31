import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        if(!userInfo || userInfo.role !== "vendor"){
          navigate("/");
        }

        const { data } = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );



        setProducts(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchVendorProducts();
  }, []);

  return (
    <div>
      <h1>Vendor Dashboard</h1>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>

          <p>₦{product.price}</p>

          <p>Stock: {product.countInStock}</p>

          <hr />
        </div>
      ))}

      <Link to="/create-product">
            <button>Create Product</button>
          </Link>
    </div>
  );
};

export default Dashboard;