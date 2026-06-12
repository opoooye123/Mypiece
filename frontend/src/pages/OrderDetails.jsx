import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    const fetchOrder =
      async () => {
        try {
          const userInfo =
            JSON.parse(
              localStorage.getItem(
                "userInfo"
              )
            );

          const { data } =
            await axios.get(
              `http://localhost:5000/api/orders/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${userInfo.token}`,
                },
              }
            );

          setOrder(data);

        } catch (error) {
          console.log(error);
        }
      };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Order Details</h1>

      <h3>
        Order ID
      </h3>

      <p>{order._id}</p>

      <hr />

      <h3>
        Products
      </h3>

      {order.orderItems.map(
        (item) => (
          <div
            key={item.product}
          >
            <p>
              {item.name}
            </p>

            <p>
              Qty:
              {" "}
              {item.qty}
            </p>

            <p>
              ₦
              {item.price}
            </p>

            <hr />
          </div>
        )
      )}

      <h3>
        Shipping Address
      </h3>

      <p>
        Address:
        {" "}
        {
          order
            .shippingAddress
            .address
        }
      </p>

      <p>
        City:
        {" "}
        {
          order
            .shippingAddress
            .city
        }
      </p>

      <p>
        Phone:
        {" "}
        {
          order
            .shippingAddress
            .phone
        }
      </p>

      <hr />

      <h3>
        Payment
      </h3>

      <p>
        Paid:
        {" "}
        {order.isPaid
          ? "Yes"
          : "No"}
      </p>

      {order.paidAt && (
        <p>
          Paid At:
          {" "}
          {new Date(
            order.paidAt
          ).toLocaleString()}
        </p>
      )}

      <hr />

      <h3>
        Status
      </h3>

      <p>
        {
          order.orderStatus
        }
      </p>

      <hr />

      <h3>
        Total Price
      </h3>

      <p>
        ₦
        {
          order.totalPrice
        }
      </p>
    </div>
  );
};

export default OrderDetails;