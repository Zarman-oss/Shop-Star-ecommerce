import { Link } from 'react-router-dom';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import Loader from './Loader';
import { useState, useEffect } from 'react';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [images, setImages] = useState([
    'https://via.placeholder.com/300x150?text=Image+1',
    'https://via.placeholder.com/300x150?text=Image+2',
    'https://via.placeholder.com/300x150?text=Image+3',
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message type="error" message="Carousel Not Available">
      {' '}
      {error}
    </Message>
  ) : (
    <div>
      <div className=" py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center flex-col">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 animate-bounce">
            Featured Products{' '}
            <span role="img" aria-label="fire emoji">
              🔥
            </span>
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-pulse">
            Check out our top picks!{' '}
            <span role="img" aria-label="sparkles emoji">
              ✨
            </span>
          </p>
          <div className="mt-4">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="h-40 w-auto mb-2 rounded"
            />
            <p className="mt-2 text-sm text-gray-600">Shop what you like</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Message from './Message';
// import { useGetTopProductsQuery } from '../slices/productApiSlice';
// import Loader from './Loader';

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handlePrevSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === 0 ? products.length - 1 : prevSlide - 1
//     );
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prevSlide) =>
//       prevSlide === products.length - 1 ? 0 : prevSlide + 1
//     );
//   };

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error" message="Carousel Not Available">
//           {error}
//         </Message>
//       ) : (
//         <div
//           id="carouselExampleCaptions"
//           className="relative"
//           data-te-carousel-init
//           data-te-ride="carousel"
//         >
//           {/* Carousel items */}
//           <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
//             {products.map((product, index) => (
//               <div
//                 key={index}
//                 className={`relative float-left w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${
//                   index === currentSlide ? '' : '-mr-[100%] hidden'
//                 }`}
//                 data-te-carousel-item
//                 style={{ backfaceVisibility: 'hidden' }}
//               >
//                 <Link to={`/product/${product._id}`}>
//                   {' '}
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className=" w-full h-auto max-h-64 object-contain mt-4 "
//                   />
//                 </Link>

//                 {/* <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-black md:block ">
//                   <h5 className="text-lg">{product.name}</h5>
//                   <p>Price: ${product.price}</p>
//                   <Link to={`/product/${product._id}`}>View Details</Link>
//                 </div> */}
//               </div>
//             ))}
//           </div>

//           {/* Carousel controls - prev and next buttons */}
//           <button
//             className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
//             type="button"
//             data-te-target="#carouselExampleCaptions"
//             data-te-slide="prev"
//             onClick={handlePrevSlide}
//           >
//             {/* Previous button icon */}
//             {/* Your SVG or Icon */}
//             Previous
//           </button>

//           <button
//             className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
//             type="button"
//             data-te-target="#carouselExampleCaptions"
//             data-te-slide="next"
//             onClick={handleNextSlide}
//           >
//             {/* Next button icon */}
//             {/* Your SVG or Icon */}
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCarousel;
