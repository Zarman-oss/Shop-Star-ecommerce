import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

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
              <div>
                {/* <Message>
                  Your Cart is empty
                  <Link to="/"> Go Back</Link>
                </Message> */}
                {/*  */}
              </div>
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
              {/* Items */}
              <li className="flex items-center justify-between">
                <span className="text-lg md:text-lg sm:text-sm">Items:</span>
                <span>
                  <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                  {cart.itemsPrice}
                </span>
              </li>
              {/* Shipping*/}
              <li className="flex items-center justify-between">
                <span className="text-lg md:text-lg sm:text-sm">Shipping:</span>
                <span>
                  <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                  {cart.shippingPrice}
                </span>
              </li>
              {/* Tax Price */}
              <li className="flex items-center justify-between">
                <span className="text-lg md:text-lg sm:text-sm">Tax:</span>
                <span>
                  <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                  {cart.taxPrice}
                </span>
              </li>
              {/* Total Price  */}
              <li className="flex items-center justify-between">
                <span className="text-lg md:text-lg sm:text-sm">
                  Total Price:
                </span>
                <span>
                  <FaDollarSign className="inline-block text-green-500 md:mr-1" />
                  {cart.totalPrice}
                </span>
              </li>
            </ul>
          </div>
          {/* error */}
          {cart.cartItems.length === 0 && (
            <div className="mt-2">
              <Message message="Your cart is empty">{error}</Message>
            </div>
          )}

          {/* Button Place Order */}
          <div className="mt-2">
            <button
              type="button"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              className={`px-4 py-2 rounded ${
                cart.cartItems.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded text-sm'
              }`}
            >
              Place Order
            </button>
          </div>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
