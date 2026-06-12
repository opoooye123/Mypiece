import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const createOrder = async () => {
    try {
      const cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const totalPrice = cartItems.reduce(
        (acc, item) =>
          acc + item.price * item.qty,
        0
      );

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems.map(
            (item) => ({
              product: item._id,
              name: item.name,
              image: item.image,
              price: item.price,
              qty: item.qty,
            })
          ),

          shippingAddress: {
            address,
            city,
            phone,
          },

          totalPrice,
        },
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.removeItem("cart");

      alert(
        "Order placed successfully!"
      );

      navigate("/my-orders");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  const verifyPayment = async (
    reference
  ) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

      const { data } =
        await axios.get(
          `http://localhost:5000/api/payments/verify/${reference}`,
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

      if (
        data.status === "success"
      ) {
        await createOrder();
      } else {
        alert(
          "Payment verification failed"
        );
      }

    } catch (error) {
      console.log(error);

      alert(
        "Payment verification failed"
      );
    }
  };

  const payWithPaystack = async (
    e
  ) => {
    e.preventDefault();

    const cartItems =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );

    const totalPrice =
      cartItems.reduce(
        (acc, item) =>
          acc +
          item.price * item.qty,
        0
      );

    const handler =
      window.PaystackPop.setup({
        key:
          import.meta.env
            .VITE_PAYSTACK_PUBLIC_KEY,

        email:
          userInfo.email,

        amount:
          totalPrice * 100,

        currency: "NGN",

        callback:
          function (response) {
            verifyPayment(
              response.reference
            );
          },

        onClose:
          function () {
            alert(
              "Payment cancelled"
            );
          },
      });

    handler.openIframe();
  };

  return (
    <div>
      <h1>Checkout</h1>

      <form>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          required
        />

        <br />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(
              e.target.value
            )
          }
          required
        />

        <br />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          required
        />

        <br />
        <br />

        <button
          onClick={
            payWithPaystack
          }
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Checkout;