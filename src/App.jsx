import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Header from "./componants/Header.jsx";
import Cart from "./Pages/Cart.jsx";
import Order from "./Pages/Order.jsx";
import Verify from "./Pages/Verify.jsx";
import MyOrders from "./Pages/MyOrders.jsx";
import Login from "./componants/Login.jsx";
import SignUp from "./componants/SignUp";
import ShopContextProvider, {
  ShopContext,
} from "./componants/Context/ShopContext.jsx";

const ProtectedElement = ({ element }) => {
  const { token } = useContext(ShopContext);
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <ShopContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <>
                <Header />
                <Product />
              </>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedElement
                element={
                  <>
                    <Header />
                    <Cart />
                  </>
                }
              />
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedElement
                element={
                  <>
                    <Header />
                    <Order />
                  </>
                }
              />
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedElement
                element={
                  <>
                    <Header />
                    <Verify />
                  </>
                }
              />
            }
          />
          <Route
            path="/myorder"
            element={
              <ProtectedElement
                element={
                  <>
                    <Header />
                    <MyOrders />
                  </>
                }
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </ShopContextProvider>
    </>
  );
};

export default App;
