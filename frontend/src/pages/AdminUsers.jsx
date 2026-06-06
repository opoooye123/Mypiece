import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(
          localStorage.getItem("userInfo")
        );

        const { data } = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setUsers(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>All Users</h1>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
          }}
        >
          <p>Name: {user.name}</p>

          <p>Email: {user.email}</p>

          <p>Role: {user.role}</p>

          <p>
            Vendor Approved:
            {" "}
            {user.isVendorApproved
              ? "Yes"
              : "No"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;