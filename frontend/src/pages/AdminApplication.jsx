import { useEffect, useState } from "react";
import axios from "axios";

const AdminApplications = () => {
  const [applications, setApplications] =
    useState([]);

  const fetchApplications =
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
            "http://localhost:5000/api/vendor-applications",
            {
              headers: {
                Authorization:
                  `Bearer ${userInfo.token}`,
              },
            }
          );

        setApplications(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  const approveApplication =
    async (id) => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.put(
          `http://localhost:5000/api/vendor-applications/${id}/approve`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        fetchApplications();

      } catch (error) {
        console.log(error);
      }
    };

  const rejectApplication =
    async (id) => {
      try {
        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.put(
          `http://localhost:5000/api/vendor-applications/${id}/reject`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${userInfo.token}`,
            },
          }
        );

        fetchApplications();

      } catch (error) {
        console.log(error);
      }
    };

    const formatPhone = (phone) => {
  if (phone.startsWith("0")) {
    return "234" + phone.slice(1);
  }

  return phone;
};

  return (
    <div>
      <h1>
        Vendor Applications
      </h1>

      {applications.length === 0 ? (
        <p>
          No applications found
        </p>
      ) : (
        applications.map(
          (application) => (
            <div
              key={
                application._id
              }
              style={{
                border:
                  "1px solid #ccc",
                padding: "10px",
                margin: "10px",
              }}
            >
              <h3>
                {
                  application.businessName
                }
              </h3>

              <p>
                Full Name:
                {" "}
                {
                  application.fullName
                }
              </p>

              <p>
                Email:
                {" "}
                {
                  application.email
                }
              </p>

              <p>
                Phone:
                {" "}
                {
                  application.phoneNumber
                }
              </p>

              <p>
                Description:
                {" "}
                {
                  application.businessDescription
                }
              </p>

              <p>
                Social:
                {" "}
                {
                  application.socialMedia
                }
              </p>

              <p>
                Address:
                {" "}
                {
                  application.businessAddress
                }
              </p>

              <p>
                Status:
                {" "}
                {
                  application.status
                }
              </p>

              {application.status ===
                "Pending" && (
                <>
                  <button
                    onClick={() => {
  if (
    window.confirm(
      "Approve this application?"
    )
  ) {
    approveApplication(
      application._id
    );
  }
}}
                  >
                    Approve
                  </button>

                  <button
                   onClick={() => {
  if (
    window.confirm(
      "Approve this application?"
    )
  ) {
    rejectApplication(
      application._id
    );
  }
}}
                  >
                    Reject
                  </button>
                  <a
  href={`mailto:${application.email}`}
>
  📧 Email Applicant
</a>

<a
  href={`https://wa.me/${formatPhone(
    application.phoneNumber
  )}`}
  target="_blank"
  rel="noreferrer"
>
  📱 WhatsApp Applicant
</a>
                </>
              )}
            </div>
          )
        )
      )}
    </div>
  );
};

export default AdminApplications;