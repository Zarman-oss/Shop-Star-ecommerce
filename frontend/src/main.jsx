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
import store from './store.js';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import ProductCart from './pages/ProductCart.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<ProductCart />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
