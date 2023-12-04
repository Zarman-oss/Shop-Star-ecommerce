import PropTypes from 'prop-types';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="flex items-center">
          {value >= index ? (
            <FaStar className="text-yellow-500" />
          ) : value >= index - 0.5 ? (
            <FaStarHalfAlt className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-yellow-500" />
          )}
        </div>
      ))}
      {text && (
        <span className="ml-2">
          {text} {text !== '1' ? 'reviews' : 'review'}
        </span>
      )}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
};

export default Rating;
