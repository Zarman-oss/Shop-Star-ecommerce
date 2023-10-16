import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrdersDetailsQuery } from '../slices/ordersApiSlice';

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
      <div>
        <h1 className="text-3xl font-semibold ">Order Page</h1>
      </div>
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
        <h1>Order {order._id}</h1>
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
            <Message type="success">Delivered on {order.deliveredAt}</Message>
          ) : (
            <Message type="error"></Message>
          )}
        </div>
        <div className="md:col-span-4">Column</div>
      </div>
    </>
  );
};

export default OrderScreen;
