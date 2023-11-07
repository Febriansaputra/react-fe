import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem("authToken");
  const full_name = localStorage.getItem("authName");
  const email = localStorage.getItem("authEmail");
  const role = localStorage.getItem("authRole");
  console.log(token, "token dari localStorage");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchData();
  }, [token]);
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="mb-4">
                See! <br /> your <br /> <span>Profile ..</span>
              </h1>
              <Link to="/add-address">
                <button className="btn btn-danger btn-lg rounded-1 me-2">
                  Add Address
                </button>
              </Link>
              <Link to="/manage-cat-tag">
                <button className="btn btn-outline-danger btn-lg rounded-1">
                  Manage
                </button>
              </Link>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              {userData ? (
                <p>Login dulu laa ..</p>
              ) : (
                <>
                  <p>nama : {full_name}</p>
                  <p>email : {email}</p>
                  <p>role : {role}</p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default ProfilePage;
