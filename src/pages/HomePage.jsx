import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Heroine from "../assets/foodhero.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products`);
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData.data);
        // setError(null);
      } catch (err) {
        // setError(err.message);
        setData(null);
      } finally {
        // setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1 className="mb-4">
                Promo! <br /> Buy 1 Get <br /> <span>Me Hehehe ..</span>
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus alias aliquam, asperiores maxime repellat iure natus
                temporibus eligendi maiores labore!
              </p>
              <Link to="/add-product">
                <button className="btn btn-danger btn-lg rounded-1 me-2">
                  Add Product
                </button>
              </Link>
              <Link to="/profil">
                <button className="btn btn-outline-danger btn-lg rounded-1">
                  Profile
                </button>
              </Link>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img src={Heroine} alt="heh" />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="product w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Check out all Promo !</h1>
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            <Col lg="12" style={{ display: "contents" }}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="search mr-sm-2 d-flex"
              />
            </Col>
          </Row>
          <Row className="mt-5 d-flex align-items-center justify-content-center">
            {data.map((item) => (
              <Col lg="3" md="4" sm="6" key={item._id} className="mt-5">
                <Card style={{ width: "15rem" }}>
                  <Card.Img variant="top" src={`http://localhost:3000/images/products/${item.image_url}`} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <button className="btn btn-sm btn-outline-danger">
                      Checkout now!
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
