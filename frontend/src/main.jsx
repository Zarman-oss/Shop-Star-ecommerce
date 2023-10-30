import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store.js';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ProductCart from './pages/ProductCart.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderScreen from './pages/OrderScreen.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import OrderListScreen from './pages/admin/OrderListScreen.jsx';
import ProductListScreen from './pages/admin/ProductListScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<ProductCart />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </React.StrictMode>
  </Provider>
);
