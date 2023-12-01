import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 ">
        Orders
      </h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="warning">{error}</Message>
      ) : (
        <div>
          <table className="min-w-full bg-white border border-gray-150 shadow-md">
            <thead>
              <tr>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  ID
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  User
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  DATE
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  TOTAL
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  PAID
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  DELIVERED
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                    {order._id}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {order.user && order.user.name}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    {order.totalPrice ? (
                      order.totalPrice
                    ) : (
                      <FaTimes
                        className="mx-auto"
                        style={{ color: 'red', display: 'block' }}
                      />
                    )}
                  </td>

                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes
                        className="mx-auto"
                        style={{ color: 'red', display: 'block' }}
                      />
                    )}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes
                        className="mx-auto"
                        style={{ color: 'red', display: 'block' }}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderListScreen;
