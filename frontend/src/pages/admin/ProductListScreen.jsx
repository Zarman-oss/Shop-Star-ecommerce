import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../slices/productApiSlice';

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          Products
        </h1>
        <button className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs">
          <FaEdit className="inline-block mr-1" /> Create Product
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="warning">{error}</Message>
      ) : (
        <>
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
                  PRICE
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  CATEGORY
                </th>
                <th className="text-sm md:text-base lg:text-lg xl:text-xl">
                  BRAND
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                    {product._id}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {product.name}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {product.price}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {product.category}
                  </td>
                  <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                    {product.brand}
                  </td>

                  <td>
                    <Link to={`/admin/product/${product._id}`}>
                      <button className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
