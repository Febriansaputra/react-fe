import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "../components/menu/style/menu.css";
import { useEffect, useState } from "react";

import Profile from "../components/menu/Profile";
import Address from "../components/menu/Address";
import Invoice from "../components/menu/Invoice";
import Cart from "../components/menu/Cart";
import Product from "../components/menu/Product";
import Category from "../components/menu/Category";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Tag from "../components/menu/Tag";
import toast from "react-hot-toast";

const Menu = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      return;
    } else {
      setTimeout(() => toast.success("anda belum login!"), 3000);
      navigate("/login");
    }
  }, [navigate]);

  const handleNavItemClick = (componentName) => {
    setSelectedComponent(componentName);
    navigate(`/hello/${componentName.toLowerCase()}`);
  };

  const renderSelectedComponent = () => {
    if (selectedComponent === "Profile") {
      return <Profile />;
    } else if (selectedComponent === "Address") {
      return <Address />;
    }
    switch (selectedComponent) {
      // case "Profile":
      //   return <Profile />;
      // case "Address":
      //   return <Address />;
      case "Invoice":
        return <Invoice />;
      case "Cart":
        return <Cart />;
      case "Product":
        return <Product />;
      case "Category":
        return <Category />;
      case "Tag":
        return <Tag />;
      default:
        return null;
    }
  };
  const currentPath = location.pathname;
  const token = localStorage.getItem("authToken");
  console.log(token, "token dari localStorage");

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100">
        <Container fluid>
          <Row>
            <Col md={3} className="ps-5 pt-4">
              <Navbar style={{ width: "auto" }}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="flex-column nav-menu">
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/profile"
                      onClick={() => handleNavItemClick("Profile")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/profile" ? "active" : ""
                        }`}
                      >
                        Profile
                      </p>
                    </Nav.Link>
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/address"
                      onClick={() => handleNavItemClick("Address")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/address" ? "active" : ""
                        }`}
                      >
                        Address
                      </p>
                    </Nav.Link>
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/product"
                      onClick={() => handleNavItemClick("Product")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/product" ? "active" : ""
                        }`}
                      >
                        Product
                      </p>
                    </Nav.Link>
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/invoice"
                      onClick={() => handleNavItemClick("Invoice")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/invoice" ? "active" : ""
                        }`}
                      >
                        Invoice
                      </p>
                    </Nav.Link>
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/cart"
                      onClick={() => handleNavItemClick("Cart")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/cart" ? "active" : ""
                        }`}
                      >
                        Cart
                      </p>
                    </Nav.Link>
                    <hr />

                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/category"
                      onClick={() => handleNavItemClick("Category")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/category" ? "active" : ""
                        }`}
                      >
                        Category
                      </p>
                    </Nav.Link>
                    <Nav.Link
                      className="menu"
                      as={Link}
                      to="/hello/tags"
                      onClick={() => handleNavItemClick("Tag")}
                    >
                      <p
                        className={`nav_link ${
                          currentPath === "/hello/tags" ? "active" : ""
                        }`}
                      >
                        Tag
                      </p>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col md={9}>{renderSelectedComponent()}</Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Menu;
