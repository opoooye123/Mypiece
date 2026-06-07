import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Total Vendors</h3>
          <h2>{stats.totalVendors}</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Total Products</h3>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Total Orders</h3>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Revenue</h3>
          <h2>₦{stats.revenue}</h2>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
          }}
        >
          <h3>Pending Applications</h3>
          <h2>
            {stats.pendingApplications}
          </h2>
        </div>
      </div>

      <hr />

      <h2>Quick Actions</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <Link to="/admin/users">
          Manage Users
        </Link>

        <Link to="/admin/applications">
          Vendor Applications
        </Link>
      </div>
    </div>
  );
};

export default Admin;