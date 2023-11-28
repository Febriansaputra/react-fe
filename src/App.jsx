import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Menu from "./pages/Menu";
import AddProductPage from "./pages/AddProductPage";
import AddAddressPage from "./pages/AddAddressPage";
import ManagePage from "./pages/ManagePage";

import FooterComponent from "./components/FooterComponent";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    fetchData();
  });
  return (
    <>
      {!isLoginPage && <NavbarComponent />}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/hello/*" element={<Menu />} />
        <Route path="/add-product" Component={AddProductPage} />
        <Route path="/add-address" Component={AddAddressPage} />
        <Route path="/manage-cat-tag" Component={ManagePage} />
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
