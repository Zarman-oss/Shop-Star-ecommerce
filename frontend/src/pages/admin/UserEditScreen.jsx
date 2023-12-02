import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from '../../slices/usersApiSlice';
import Message from '../../components/Message';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Link
        to="/admin/userlist"
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-2"
      >
        <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2   py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
          Go Back
        </button>
      </Link>
      <FormContainer>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 text-center">
          Edit User
        </h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="warning">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            {/* name  */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Name</h2>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Email */}{' '}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <h2 className="text-2xl">Email</h2>
              </label>
              <input
                id="name"
                type="email"
                placeholder="Enter price"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Admin form check */}
            <div className="flex items-center mb-4">
              <label
                htmlFor="check"
                className="text-sm font-medium text-gray-700 mr-2"
              >
                Is Admin
              </label>
              <input
                id="check"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
              />
            </div>
            {/* Update Button */}
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
            >
              Update
            </button>
            {isLoading && <Loader />}
          </form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
