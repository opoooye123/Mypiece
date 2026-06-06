import { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        console.log(data);

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Order ID</h3>
            <p>{order._id}</p>

            <p>
              Total: ₦{order.totalPrice}
            </p>

            <p>
              Paid:{" "}
              {order.isPaid ? "Yes" : "No"}
            </p>

            <p>
  Status: {order.orderStatus}
</p>

            <p>
              Date:{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;