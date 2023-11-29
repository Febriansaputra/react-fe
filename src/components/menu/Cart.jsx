import { Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeAllCart, removeCartItem } from "../../redux/actions/actionCart";
import { useEffect } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const full_name = localStorage.getItem("authName");

  console.log(cartItems, "cartItems");

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleRemoveAll = () => {
    dispatch(removeAllCart());
  };

  useEffect(() => {
    dispatch(getCart());
  }, []);
  console.log(cartItems, " sad");

  return (
    <>
      <>
        <Col lg="12" className="flex-coloum pb-2">
          <h5 style={{ fontWeight: 600 }}>
            Address <span style={{ color: "red" }}> {full_name} !</span>{" "}
          </h5>
          <button className="btn btn-danger btn-sm" onClick={handleRemoveAll}>
            Remove All
          </button>
        </Col>
        <Col lg="12">
          <Table
            className="text-center fw-semibold"
            striped
            bordered
            hover
            responsive
            style={{ fontSize: 14 }}
          >
            <thead>
              <tr>
                <th>No</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      style={{ width: "5rem", paddingRight: 5 }}
                      src={`http://localhost:3000/images/products/${item.Image_url}`}
                      alt=""
                    />
                    {item.name}
                  </td>
                  <td style={{ color: "red" }}>Rp. {item.price * item.qty}</td>
                  <td>
                    <button className="btn btn-sm btn-danger me-2">-</button>
                    {item.qty}
                    <button className="btn btn-sm btn-success ms-2">+</button>
                  </td>
                  <td style={{ color: "red" }}>Rp. {item.price * item.qty}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {cartItems?.map((item) => (
                <tr key={item._id}>
                  <td colSpan={5}>Total</td>
                  <td style={{ color: "green" }}>Rp. {item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </>
    </>
  );
};

export default Cart;
