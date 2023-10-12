import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { FaPaypal } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';

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
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 text-center">
          PlaceOrderPage
        </h1>

        {/* Shipping Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Shipping
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Address:
              </h1>
              <br />
              <FaLocationArrow className="text-xl md:text-2xl lg:text-3xl mr-1" />
              <span className="text-sm md:text-base lg:text-lg">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </span>
            </p>
          </div>
        </div>
        {/* Payment Method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ">
              Payment Method
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Method:
              </h1>
              <FaPaypal className="text-xl md:text-2xl lg:text-3xl mr-2" />
              <span className="text-sm md:text-base lg:text-lg">
                {cart.paymentMethod}
              </span>
            </p>
          </div>
        </div>
        {/* Order Items */}
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ? ( 
       <Message>Your Cart is empty</Message>
        ) : (
         
        )}
      </div>
    </>
  );
};

export default PlaceOrderPage;
