import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

const Tag = () => {
  const [tags, setTags] = useState("");
  const [refetchIndicator, setRefetchIndicator] = useState(false);
  const [dataTag, setDataTag] = useState([]);
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          "http://localhost:3000/api/tags",
          { name: tags },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("Created Tags Successfully : ", response.data);
          setRefetchIndicator((prevValue) => !prevValue);
          toast.success("Successfully create tag!");
        })
    } catch (error) {
      console.error("Error adding Tag ", error);
      toast.error("Anda bukan admin! failed to create Tag!");

    }
  };

  useEffect(() => {
    const getTag = async () => {
      const res = await axios.get("http://localhost:3000/api/tags");
      console.log(res.data.data);

      setDataTag(res.data.data);
    };
    getTag();
  }, [token, refetchIndicator]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tags?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/tags/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Data sudah ilang", response.data.data);
        toast.success("Successfully delete category!");
        setRefetchIndicator((prevValue) => !prevValue);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    } else {
      console.log("Deletion canceled.");
    }
  };
  const full_name = localStorage.getItem("authName");

  return (
    <>
      <Toaster
        position="right"
        reverseOrder={false}
        gutter={1}
        containerClassName=""
        containerStyle={{
          marginBottom: "7rem",
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Row className="header-box">
        <Col lg="12" className="pt-lg-0 pt-5 row">
          <h5 style={{ fontWeight: 600 }}>
            Tag <span style={{ color: "red" }}> {full_name} !</span>{" "}
          </h5>
          <Form onSubmit={handleSubmit} className="d-flex mb-3 ">
            <Col lg="6">
              <InputGroup>
                <InputGroup.Text id="basic-addon1">
                  <i className="bi bi-bookmark-fill"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tags"
                  aria-label="Tags"
                  aria-describedby="basic-addon1"
                  value={tags.name}
                  onChange={(e) => setTags(e.target.value)}
                />
              </InputGroup>
            </Col>
            <button
              type="submit"
              className="btn btn-sm btn-success btn-lg rounded-3 ms-2"
            >
              Created!
            </button>
          </Form>
        </Col>

        <Col lg="12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataTag.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Tag;
