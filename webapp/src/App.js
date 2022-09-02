
import React, { Suspense } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const HomePage = React.lazy(() => import('./pages/HomePage'))
const ShopPage = React.lazy(() => import('./pages/ShopPage'))
const ProductPage = React.lazy(() => import('./pages/ProductPage'))
const CartPage = React.lazy(() => import('./pages/CartPage'))
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'))
const OrderPage = React.lazy(() => import('./pages/OrderPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))
const ForgotPassPage = React.lazy(() => import('./pages/ForgotPassPage'))

function App() {
  return (
    <BrowserRouter forceRefresh>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Home Page" element={<HomePage />} />
          <Route exact path="/home" name="Home Page" element={<HomePage />} />
          <Route exact path="/about" name="About Page" element={<AboutPage />} />
          <Route exact path="/contact" name="Contact Page" element={<ContactPage />} />
          <Route exact path="/shop" name="Shop Page" element={<ShopPage />} />
          <Route exact path="/shop/:keyword" name="Shop Page" element={<ShopPage />} />
          <Route exact path="/product/:id" name="Product Page" element={<ProductPage />} />
          <Route exact path="/cart" name="Cart Page" element={<CartPage />} />
          <Route exact path="/checkout" name="Checkout Page" element={<CheckoutPage />} />
          <Route exact path="/order" name="Order Page" element={<OrderPage />} />
          <Route exact path="/login" name="Login Page" element={<LoginPage />} />
          <Route exact path="/register" name="Register Page" element={<RegisterPage />} />
          <Route exact path="/profile" name="Profile Page" element={<ProfilePage />} />
          <Route exact path="/forgotpass" name="ForgotPass Page" element={<ForgotPassPage />} />
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
