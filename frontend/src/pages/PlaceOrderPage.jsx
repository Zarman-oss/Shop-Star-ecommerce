import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { FaPaypal, FaDollarSign } from 'react-icons/fa';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Shipping
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Address:
              </h1>
              <br />
              <FaLocationArrow className="text-xl md:text-2xl lg:text-3xl mr-1 text-red-500" />
              <span className="text-sm md:text-base lg:text-lg">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </span>
            </p>
          </div>
        </div>
        {/* Payment Method */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="md:col-span-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold ">
              Payment Method
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Method:
              </h1>
              <FaPaypal className="text-xl md:text-2xl lg:text-3xl mr-2 text-blue-500" />

              <span className="text-sm md:text-base lg:text-lg">
                {cart.paymentMethod}
              </span>
            </p>
          </div>
        </div>
        {/* Order Items */}
        <div className=" mt-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Order Items
          </h2>
          {cart.cartItems.length === 0 ? (
            <Message>
              Your Cart is empty
              <Link to="/"> Go Back</Link>
            </Message>
          ) : (
            <div className="text-lg">
              <div className="flex flex-col items-start">
                {' '}
                {/* Use 'items-start' to align contents to the left */}
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {' '}
                    {/* Use 'items-start' to align children to the left */}
                    <div className="w-24 mt-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex items-start space-x-4">
                      <Link
                        to={`/products/${item.product}`}
                        className="text-lg"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm">
                        <p>
                          <span className="font-semibold">Quantity:</span>{' '}
                          {item.qty}
                        </p>
                        <p>
                          <span className="font-semibold ">Price:</span>
                          <FaDollarSign className="inline-block  mb-1 text-green-500" />
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculate and display the total price outside the loop */}
              <div className="text-lg mt-4">
                <p>
                  <span className="font-semibold text-3xl">Total Price:</span>
                  <FaDollarSign className="inline-block  mb-1 text-green-500" />
                  {cart.cartItems.reduce(
                    (total, item) => total + item.qty * item.price,
                    0
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
