import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");

  // const [categorySelect, setCategorySelect] = useState("");
  // const [tagSelect, setTagSelect] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }
    if (tag) {
      formData.append("tag", tag);
    }
    if (category) {
      formData.append("category", category);
    }

    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        body: formData,
      });
      console.log('Respon dari server:', response.data);
      if (response.ok) {
        setName("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        setTag("");
        setCategory("");
        console.log('berhasi;', response)
      } else {
        console.error("failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // const selectedCategory = await category.find(
    //   (categories) => categories.value === category
    // );
    // const selectedTag = await tag.find((tags) => tags.value === tag);
    // console.log(selectedCategory);
    // console.log(selectedTag);
    console.log("ini select coba");
  };

  const getCategory = async () => {
    const response = await fetch("http://localhost:3000/api/categories");
    // console.log("Data Category", response.json());
    const category = await response.json();
    const result = category.data.map((data) => {
      return {
        label: data.name,
        value: data._id,
      };
    });
    console.log("data Category", result);
    setCategory(result.sort((a, b) => a.label.localeCompare(b.label)));
  };
  const getTags = async () => {
    const response = await fetch("http://localhost:3000/api/tags");
    const tag = await response.json();
    const result = tag.data.map((data) => {
      return {
        label: data.name,
        value: data._id,
      };
    });
    console.log("data Tag", result);
    setTag(result.sort((a, b) => a.label.localeCompare(b.label)));
  };
  useEffect(() => {
    getCategory();
    getTags();
  }, []);
  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 pt-5">
        <Container>
          <Row className="header-box pt-5">
            <Col lg="12">
              <h3 className="mb-4 text-center">
                Create! your product <span> ..</span>
              </h3>
            </Col>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Col lg="12" className="pt-lg-0 pt-5 row">
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label>Nama Product</Form.Label>
                  <Form.Control
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name .."
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a images.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    required
                    placeholder="Price .."
                  />
                  <Form.Control.Feedback type="invalid">
                    Please set a price.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label column sm={2}>
                    Tag
                  </Form.Label>
                  <Select
                    name="tag"
                    options={tag}
                    onChange={(e) => setTag(e.value)}
                    autoFocus
                    placeholder="Select Tag ..."
                  ></Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Tag.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label column sm={2}>
                    Category
                  </Form.Label>
                  <Select
                    name="category"
                    options={category}
                    onChange={(e) => setCategory(e.value)}
                    autoFocus
                    placeholder="Select Category ..."
                  ></Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a Category.
                  </Form.Control.Feedback>
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
                <Form.Group className="mb-3" as={Col} lg="6" md="6" sm="12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    as="textarea"
                    required
                    rows={3}
                    placeholder="Description .."
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <button
                  type="submit"
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

export default AddProductPage;
