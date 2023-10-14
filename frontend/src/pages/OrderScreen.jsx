import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import Message from '../components/Loader';
import Loader from '../components/Loader';

function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  return <div>OrderScreen</div>;
}

export default OrderScreen;
