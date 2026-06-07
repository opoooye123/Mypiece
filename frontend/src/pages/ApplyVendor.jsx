import { useState } from "react";
import axios from "axios";

const ApplyVendor = () => {
  const [formData, setFormData] =
    useState({
      fullName: "",
      businessName: "",
      email: "",
      phoneNumber: "",
      businessDescription: "",
      socialMedia: "",
      businessAddress: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      await axios.post(
        "http://localhost:5000/api/vendor-applications/apply",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`,
          },
        }
      );

      alert(
        "Application submitted"
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div>
    <h1>Apply As Vendor</h1>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <br />

      <input
        type="text"
        name="businessName"
        placeholder="Business Name"
        value={formData.businessName}
        onChange={handleChange}
      />

      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <br />

      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
      />

      <br />

      <textarea
        name="businessDescription"
        placeholder="Business Description"
        value={formData.businessDescription}
        onChange={handleChange}
      />

      <br />

      <input
        type="text"
        name="socialMedia"
        placeholder="Instagram/TikTok/Facebook (Optional)"
        value={formData.socialMedia}
        onChange={handleChange}
      />

      <br />

      <textarea
        name="businessAddress"
        placeholder="Business Address"
        value={formData.businessAddress}
        onChange={handleChange}
      />

      <br />

      <button type="submit">
        Submit Application
      </button>
    </form>
  </div>
);
};

export default ApplyVendor;