import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

const Home = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          type="error"
          message={error?.data?.message || error.error || 'An error occurred'}
        />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-semibold">Featured Products</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {data.products.map((product) => (
              <div
                className="bg-white p-4 rounded shadow-md text-center"
                key={product._id}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate pages={data.pages} page={data.page} />
        </div>
      )}
    </div>
  );
};

export default Home;
