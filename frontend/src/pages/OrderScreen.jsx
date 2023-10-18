import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrdersDetailsQuery } from '../slices/ordersApiSlice';
import { FaDollarSign } from 'react-icons/fa';

const OrderScreen = () => {
  const { id: orderId } = useParams('');
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrdersDetailsQuery(orderId);
  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message type="error" />
  ) : (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-center">
        Order Page
      </h1>
      <div className="mt-3">
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-4"
        >
          <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2  m py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
            Go Back
          </button>
        </Link>
      </div>
      {/* H1 */}
      <>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Order {order._id}
        </h1>
      </>
      {/* First Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-8">
          <h2>Shipping</h2>
          <p>
            <strong>Name: </strong> {order.user.name}
          </p>
          <p>
            <strong>Email: </strong> {order.user.email}
          </p>
          <p>
            <strong>Address: </strong> {order.shippingAddress.address},{' '}
            {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
            {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <Message type="success" message="Delivered">
              Delivered on {order.deliveredAt}
            </Message>
          ) : (
            <Message type="error" message="Not Delivered"></Message>
          )}
        </div>
        {/* Payment */}
        <div className="md:col-span-8">
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <Message type="success" message="Delivered">
              Paid on {order.paidAt}
            </Message>
          ) : (
            <Message type="error" message="Not Paid"></Message>
          )}
        </div>
        {/* Order Items */}
        <div className="md:col-span-8">
          <h2>Order Items</h2>
          {order.orderItems.map((item, index) => (
            <div key={index}>
              <div className="flex items-center">
                <div className="w-16">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded"
                  />
                </div>
                <div className="flex-1 pl-4">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>
                {/* Price with dollar sign  */}
                <li className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-1">{item.qty} x</span>
                    <span>
                      {item.price}
                      <FaDollarSign className="inline-block text-green-500 " />
                      {' = '}
                      {item.qty * item.price}
                      <FaDollarSign className="inline-block text-green-500 " />
                    </span>
                  </span>
                </li>
              </div>
            </div>
          ))}
        </div>

        {/* 2nd Column */}
        {/* <div className="md:col-span-4">Column</div> */}
      </div>
    </>
  );
};

export default OrderScreen;
