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

  const handleDelete = async (id) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(
        products.filter((p) => p._id !== id)
      );
    }catch(error){
      console.log(error.response?.data)
    }
  }

  return (
    <div>
      <h1>Vendor Dashboard</h1>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>

          <p>₦{product.price}</p>

          <p>Stock: {product.countInStock}</p>

          <button onClick={() => handleDelete(product._id)}>
            Delete
          </button>

          <button onClick={() => 
            navigate(`/edit-product/${product._id}`)
          }>
            Edit
          </button>

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