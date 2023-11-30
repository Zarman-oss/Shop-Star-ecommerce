import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import Loader from './Loader';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? products.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === products.length - 1 ? 0 : prevSlide + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === products.length - 1 ? 0 : prevSlide + 1
      );
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [products.length]); // Re-run effect when the number of products changes

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message="Carousel Not Available">
          {error}
        </Message>
      ) : (
        <div
          id="carouselExampleCaptions"
          className="relative"
          data-te-carousel-init
          data-te-ride="carousel"
        >
          {/* Carousel items */}
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
            {products.map((product, index) => (
              <div
                key={index}
                className={`relative float-left w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
                  index === currentSlide ? '' : '-mr-[100%] hidden'
                }`}
                data-te-carousel-item
                style={{ backfaceVisibility: 'hidden' }}
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-52 object-contain mt-4"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Carousel controls - prev and next buttons */}
          {/* <button
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-700 text-white py-2 px-4 rounded-md text-sm"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="prev"
            onClick={handlePrevSlide}
          >
            Previous
          </button>

          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-700 text-white py-2 px-4 rounded-md text-sm"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="next"
            onClick={handleNextSlide}
          >
            Next
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
