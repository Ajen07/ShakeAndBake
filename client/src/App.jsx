import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Error from "./pages/Error";
import EmailVerification from "./pages/EmailVerification";
import ProtectedRoute from "./pages/ProtectedRoute";
import Cart from "./pages/dashboard/Cart";
import Orders from "./pages/dashboard/Orders";
import Profile from "./pages/dashboard/Profile";
import SharedLayout from "./pages/dashboard/SharedLayout";
import SharedLayoutAdmin from "./pages/adminDashboard/SharedLayoutAdmin";
import AllProducts from "./pages/AllProducts";
import AddProducts from "./pages/adminDashboard/AddProducts";
import SingleProduct from "./pages/SingleProduct";
import CheckoutPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentAuthentication from "./pages/PaymentAuthentication";
import SingleOrderPage from "./pages/SingleOrderPage";
import SharedLayoutOrdersPage from "./pages/SharedLayoutOrdersPage";
function App() {
  return (
    <BrowserRouter className="text-3xl font-bold underline">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user-email-verification"
          element={<EmailVerification />}
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllProducts />} />
          <Route path="products/:productId" element={<SingleProduct />} />
          <Route path="user-cart" element={<Cart />} />
          <Route path="user-orders" element={<SharedLayoutOrdersPage />}>
            <Route index element={<Orders />} />
            <Route path=":orderId" element={<SingleOrderPage />} />
          </Route>
          <Route path="user-profile" element={<Profile />} />
        </Route>
        <Route
          path="/payment-authentication"
          element={<PaymentAuthentication />}
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkoutsuccess" element={<PaymentSuccessPage />} />
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute>
              <SharedLayoutAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllProducts />} />
          <Route path="add-product" element={<AddProducts />} />
          <Route path="products/:productId" element={<SingleProduct />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
