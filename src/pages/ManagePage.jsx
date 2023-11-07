import axios from "axios";
import { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

const ManagePage = () => {
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios
        .post("http://localhost:3000/api/categories")
        .then((response) => {
          console.log("Created Categories Successfully : ", response.data);
          setCategories({
            category: "",
          });
        })
        .catch((error) => {
          console.log("Created categories failed: ", error);
        });
    } catch (error) {
      return error, "Categories failed: ", error;
    }
    try {
      await axios
        .post("http://localhost:3000/api/tags", tags)
        .then((response) => {
          console.log("Created Tags Successfully : ", response.data);
          setTags({
            tags: "",
          });
        })
        .catch((error) => {
          console.log("Created Tags failed: ", error);
        });
    } catch (error) {
      return error, "TAGS failed: ", error;
    }
  };

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 pt-5">
        <Container>
          <Row className="header-box pt-5">
            <Col lg="12">
              <h3 className="mb-4 text-center">
                Add Category & Tags <span> ..</span>
              </h3>
            </Col>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Col lg="6" className="pt-lg-0 pt-5">
                <Form.Group className="mb-3" as={Col} md="8">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    onChange={(e) => setCategories(e.value)}
                    value={categories}
                    name="name"
                    type="text"
                    required
                    placeholder="Category .."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a Category.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} md="8">
                  <Form.Label>Tag</Form.Label>
                  <InputGroup size="md" className="mb-3">
                    <InputTags
                      className="form-control !bg-transparent"
                      name="tags"
                      style={{ border: "1px solid red" }}
                      placeholder="Tags .."
                      onTags={(value) => setTags(value.values)}
                    />
                    <button
                      className="btn btn-outline-danger"
                      type="button"
                      onChange={(e) => setTags(e.value)}
                      name="tag"
                      value={tags}
                      data-testid="button-clearAll"
                      onClick={() => {
                        setTags([]);
                      }}
                    >
                      Delete all
                    </button>
                    <Form.Control.Feedback type="invalid">
                      Please choose a Tag.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    id="done"
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Form.Group>
                <button
                  type="submit"
                  // onClick={handleLogin}
                  className="btn btn-sm btn-danger btn-lg rounded-1 me-2"
                >
                  Created!
                </button>
              </Col>
            </Form>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default ManagePage;
