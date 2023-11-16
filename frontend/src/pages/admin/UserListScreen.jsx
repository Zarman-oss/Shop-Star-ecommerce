import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const deleteHandler = (id) => {
    console.log('delete');
  };

  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold mb-6 ">
        Users
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

                  <td>
                    <Link to={`admin/user/${user._id}/edit`}>
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

export default UserListScreen;
