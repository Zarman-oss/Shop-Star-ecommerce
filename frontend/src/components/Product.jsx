// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { FaDollarSign } from 'react-icons/fa';
// import Rating from './Rating';

// const Product = ({ product }) => {
//   return (
//     <div>
//       <div className="my-3 p-3 rounded">
//         <Link to={`/product/${product._id}`}>
//           <img
//             src={product.image}
//             className="w-full h-auto max-h-48 object-contain"
//           />
//           <div className="flex mt-3">
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//           </div>
//         </Link>

//         <div>
//           <div className="flex items-center">
//             <FaDollarSign className="text-green-700 text-lg" />
//             <p className="text-green-700 font-semibold text-lg">
//               {product.price.toFixed(2)}
//             </p>
//           </div>
//           <div className="flex text-lg ">
//             <Rating value={product.rating} text={`${product.numReviews}`} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Product.propTypes = {
//   product: PropTypes.shape({
//     image: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     rating: PropTypes.number.isRequired,
//     _id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     numReviews: PropTypes.number.isRequired,
//   }).isRequired,
// };

// export default Product;

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <div>
      <div className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            className="w-full h-auto max-h-48 object-contain"
            alt={product.name} // Added alt text for accessibility
          />
          <div className="flex mt-3">
            <h2 className="text-lg font-semibold">{product.name}</h2>
          </div>
        </Link>

        <div>
          <div className="flex items-center">
            <FaDollarSign className="text-green-700 text-lg" />
            <p className="text-green-700 font-semibold text-lg">
              {product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex text-lg">
            <Rating value={product.rating} text={`${product.numReviews}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired, // Updated to string
    name: PropTypes.string.isRequired,
    numReviews: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
