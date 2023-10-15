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
    <div>
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
    </div>
  );
};

export default OrderScreen;
