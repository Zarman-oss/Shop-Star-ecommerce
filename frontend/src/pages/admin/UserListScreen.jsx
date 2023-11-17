import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 ">
        Users
      </h1>
      {loadingDelete && <Loader />}
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
                  NAME
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  EMAIL
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  ADMIN
                </th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                    {user._id}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {user.name}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck
                        className="mx-auto"
                        style={{ color: 'green', display: 'block' }}
                      />
                    ) : (
                      <FaTimes
                        className="mx-auto"
                        style={{ color: 'red', display: 'block' }}
                      />
                    )}
                  </td>

                  <td className="flex items-center space-x-2">
                    <Link to={`/admin/userlist/${user._id}/edit`}>
                      <button className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="hover:text-red-600 hover:scale-105 transform transition-transform"
                    >
                      <FaTrash />
                    </button>
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

export default UserListScreen;
