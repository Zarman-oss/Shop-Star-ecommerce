import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 ">
        User Profile
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="warning">{error}</Message>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default OrderListScreen;
