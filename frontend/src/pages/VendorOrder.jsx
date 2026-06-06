import { useEffect, useState } from "react";
import axios from "axios";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:5000/api/orders/vendor-orders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVendorOrders();
  }, []);

  const updateStatus = async (
  orderId,
  status
) => {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  await axios.put(
    `http://localhost:5000/api/orders/${orderId}/status`,
    {
      orderStatus: status,
    },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );

  window.location.reload();
};

  return (
    <div>
      <h1>Vendor Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
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
            <h3>Customer</h3>

            <p>{order.user?.name}</p>

            <p>{order.user?.email}</p>

            <p>
              Total: ₦{order.totalPrice}
            </p>

            <p>
              Paid:{" "}
              {order.isPaid ? "Yes" : "No"}
            </p>

            <h4>Products</h4>

            {order.orderItems.map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <p>Qty: {item.qty}</p>
              </div>
            ))}

              <p>Status: {order.orderStatus}</p>

<select
  value={order.orderStatus}
  onChange={(e) =>
    updateStatus(
      order._id,
      e.target.value
    )
  }
>
  <option value="Pending">
    Pending
  </option>

  <option value="Processing">
    Processing
  </option>

  <option value="Shipped">
    Shipped
  </option>

  <option value="Delivered">
    Delivered
  </option>
</select>
          </div>
        ))
      )}
    </div>
  );
};

export default VendorOrders;