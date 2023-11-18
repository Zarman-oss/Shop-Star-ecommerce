import { FaDollarSign, FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Link } from 'react-router-dom';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productApiSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you wanna create a new product?  ')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-3">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          Products
        </h1>
        <button
          onClick={createProductHandler}
          className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
        >
          <FaEdit className="inline-block mr-1" /> Create Product
        </button>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="warning">{error}</Message>
      ) : (
        <>
          <div className="mx-auto">
            <table className="min-w-full bg-white border border-gray-150 shadow-md ">
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
                {data.products.map((product) => (
                  <tr key={product._id}>
                    <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center">
                      {product._id}
                    </td>
                    <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                      {product.name}
                    </td>
                    <td className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center">
                      {product.price}{' '}
                      <FaDollarSign className="inline-block mb-1 text-green-500" />
                    </td>

                    <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                      {product.category}
                    </td>
                    <td className="text-sm md:text-base lg:text-lg xl:text-xl text-center ">
                      {product.brand}
                    </td>

                    <td className="flex items-center space-x-0">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="mr-2"
                      >
                        <button className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs">
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="hover:text-red-600 hover:scale-105 transform transition-transform"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
