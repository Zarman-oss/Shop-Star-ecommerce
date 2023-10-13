import { useState } from 'react';
import { useGetProductsDetailsQuery } from '../slices/productApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate('/cart');
  };

  return (
    <>
      <Link
        to="/"
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 mb-2"
      >
        <button className="text-sm sm:text-base md:text-lg lg:text-xl px-2   py-1 sm:py-2 sm:px-2 md:px-3 md:py-2 lg:px-4 lg:py-2">
          Go Back
        </button>
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message="Error">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="min-h-screen p-4 mt-6">
          <div className="max-w-screen-md mx-auto mt-8 ">
            <div className="md:flex ">
              {/* Product Image */}
              <div className="md:w-1/2 md:mr-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto max-h-48 md:w-full md:max-h-96 object-contain mt-4 "
                />
              </div>
              {/* Review Card */}
              <div className="md:w-1/2 md:pl-4 md:flex md:flex-col">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <div className="mt-6">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    {/* Description */}
                    <div className="mt-3">
                      <h4 className="text-xl ">
                        <strong>Description: </strong>
                        {product.description}
                      </h4>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="mt-2">
                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mt-2">
                    <FaDollarSign className="text-green-700 text-md" />
                    <p className="text-green-700 font-semibold text-md">
                      {product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="mt-3">
                    <div className="flex items-center">
                      <div className="flex-grow pr-2">Status:</div>
                      <div
                        className={`flex items-center mt-2 ${
                          product.countInStock === 0
                            ? 'text-red-500'
                            : 'text-green-700'
                        }`}
                      >
                        <p className=" font-semibold text-md">
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Qty */}
                  {product.countInStock > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center">
                        <div className="flex-grow pr-2">Quantity:</div>
                        <div className="flex items-center mt-2">
                          <select
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="border rounded-md px-2 py-1"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Button Add to cart */}
                  <div className="flex">
                    <div className="mt-4">
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center space-x-2"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
