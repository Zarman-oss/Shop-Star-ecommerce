// import { Link } from 'react-router-dom';
// import Message from './Message';
// import { useGetTopProductsQuery } from '../slices/productApiSlice';
// import Loader from './Loader';
// import { useState } from 'react';

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message type="error" message="Carousel Not Available">
//       {' '}
//       {error}
//     </Message>
//   ) : (
//     <div></div>
//   );
// };

// export default ProductCarousel;

import { useState } from 'react';
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
                  {' '}
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" w-full h-auto max-h-64 object-contain mt-4 "
                  />
                </Link>

                {/* <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-black md:block ">
                  <h5 className="text-lg">{product.name}</h5>
                  <p>Price: ${product.price}</p>
                  <Link to={`/product/${product._id}`}>View Details</Link>
                </div> */}
              </div>
            ))}
          </div>

          {/* Carousel controls - prev and next buttons */}
          <button
            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="prev"
            onClick={handlePrevSlide}
          >
            {/* Previous button icon */}
            {/* Your SVG or Icon */}
            Previous
          </button>

          <button
            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            data-te-target="#carouselExampleCaptions"
            data-te-slide="next"
            onClick={handleNextSlide}
          >
            {/* Next button icon */}
            {/* Your SVG or Icon */}
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
