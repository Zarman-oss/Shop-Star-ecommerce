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
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row p-4">
        {/* First Column */}
        <div className="md:w-1/2 pr-4 ">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-center">
            PlaceOrderPage
          </h1>
          {/* Shipping Address */}
          <div className="mt-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Shipping
            </h2>
            <p className="flex items-center">
              <h1 className="text-lg md:text-lg lg:text-xl font-semibold mr-1">
                Address:
              </h1>
              <FaLocationArrow className="text-xl md:text-2xl lg:text-3xl mr-1 text-red-500" />
              <span className="text-sm md:text-base lg:text-lg">
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </span>
            </p>
          </div>
          {/* Payment Method */}
          <div className="mt-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
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
          {/* Order Items */}
          <div className="mt-2">
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
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-24 mt-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full rounded cursor-pointer"
                        />
                      </div>
                      <div className="flex items-start space-x-4">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-blue-500 hover:underline text-sm md:text-base"
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
                            <FaDollarSign className="inline-block mb-1 text-green-500" />
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Second Column (Order Summary) */}
        <div className="  md:w-1/2  md:mt-20 p-4 md:mb-4">
          <div className="bg-white rounded-md p-4 shadow-md md:w-full lg:w-96 xl:w-96">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Order Summary
            </h2>
            <ul className="list-none p-0">
              <li className="flex items-center justify-between">
                <span className="text-lg md:text-lg sm:text-sm">Items:</span>
                <span>
                  <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                  {cart.itemsPrice}
                </span>
              </li>
              {/* Add more list items as needed */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
