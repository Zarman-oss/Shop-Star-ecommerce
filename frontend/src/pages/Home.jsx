import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-2"
        >
          <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2 py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
            Go Back
          </button>
        </Link>
      )}
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
          {data && data.products && data.products.length > 0 ? (
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
          ) : (
            <Message type="info">No products available.</Message>
          )}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
