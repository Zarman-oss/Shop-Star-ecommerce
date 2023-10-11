import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 className="text-4xl font-semibold mb-6 text-center">
          PlaceOrderPage
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold">Shipping</h2>
            <p>
              <h1 className="text-3xl font-bold">Address:</h1>
              {cart.shippingAddress.address},{cart.shippingAddress.city}, {''}
              {cart.shippingAddress.postalCode},{''}
              {cart.shippingAddress.country}
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="text-lg">Column</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
