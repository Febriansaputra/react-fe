import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavbarComponent from "./components/NavbarComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AddProductPage from "./pages/AddProductPage";
import AddAddressPage from "./pages/AddAddressPage";
import ManagePage from "./pages/ManagePage";

// import FooterComponent from "./components/FooterComponent";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register'
  return (
    <>
    {!isLoginPage && <NavbarComponent />}
      {/* <NavbarComponent /> */}
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/profil" Component={ProfilePage} />
        <Route path="/add-product" Component={AddProductPage} />
        <Route path="/add-address" Component={AddAddressPage} />
        <Route path="/manage-cat-tag" Component={ManagePage} />
      </Routes>
      {/* <FooterComponent /> */}
    </>
  );
}

export default App;
