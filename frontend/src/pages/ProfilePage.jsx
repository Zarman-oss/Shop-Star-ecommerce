import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updates successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 text-center">
          User Profile
        </h1>
        <form onSubmit={submitHandler}>
          {/* Name */}
          <div className="my-2">
            <label
              htmlFor="name"
              className="block text-sm font-md text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              placeholder="Enter name"
            />
          </div>

          {/* email */}
          <div className="my-2">
            <label
              htmlFor="email"
              className="block text-sm font-md text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              placeholder="Enter email"
            />
          </div>
          {/* Password */}
          <div className="my-2">
            <label
              htmlFor="password"
              className="block text-sm font-md text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="name"
              name="name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              placeholder="Enter password"
            />
          </div>
          {/* confirm password */}
          <div className="my-2">
            <label
              htmlFor="password"
              className="block text-sm font-md text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="name"
              name="name"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              placeholder="Confirm password"
            />
          </div>
          {/* update button  */}
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
          >
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      {/* Second Column */}
      <div className="w-3/4 p-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-center">
          My Orders
        </h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="warning">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-150 shadow-md">
              <thead>
                <tr>
                  <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                    ID
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
                    <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="md:text-lg lg:text-xl xl:text-2xl text-center">
                      {order.totalPrice}
                    </td>
                    <td className="md:text-lg lg:text-xl xl:text-2xl text-center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes
                          className="mx-auto"
                          style={{ color: 'red', display: 'block' }}
                        />
                      )}
                    </td>
                    <td className="md:text-lg lg:text-xl xl:text-2xl text-center">
                      {order.isDelivered ? (
                        order.deliverAt.substring(0, 10)
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
      </div>
    </div>
  );
};

export default ProfilePage;
