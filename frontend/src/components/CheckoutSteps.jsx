import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-6 space-x-4 text-lg">
      <div className="nav-item">
        {step1 ? (
          <Link
            to="/login"
            className="nav-link rounded-md py-1 px-1 hover:bg-gray-300 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
        ) : (
          <span className="nav-link-disabled text-gray-400">Sign In</span>
        )}
      </div>

      {/* 2nd */}
      <div className="nav-item">
        {step2 ? (
          <Link
            to="/shipping"
            className="nav-link  rounded-md py-1 px-1  hover:bg-gray-300 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Shipping
          </Link>
        ) : (
          <span className="nav-link-disabled text-gray-400">Shipping</span>
        )}
      </div>
      {/* 3rd */}
      <div className="nav-item">
        {step3 ? (
          <Link
            to="/payment"
            className="nav-link hover:bg-gray-300  rounded-md py-1 px-1  hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Payment
          </Link>
        ) : (
          <span className="nav-link-disabled text-gray-400 ">Payment</span>
        )}
      </div>
      {/* 4th */}
      <div className="nav-item">
        {step4 ? (
          <Link
            to="/placeorder"
            className="nav-link hover:bg-gray-300  rounded-md py-1 px-1 hover:text-gray-800 transition duration-300 ease-in-out"
          >
            Place Order
          </Link>
        ) : (
          <span className="nav-link-disabled text-gray-400">Place Order</span>
        )}
      </div>
    </nav>
  );
};

// CheckoutSteps.propTypes = {
//   step1: PropTypes.bool.isRequired,
//   step2: PropTypes.bool.isRequired,
//   step3: PropTypes.bool.isRequired,
// };

export default CheckoutSteps;
