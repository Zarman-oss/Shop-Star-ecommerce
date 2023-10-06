import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const CheckoutSteps = ({ step1, step2, step3 }) => {
  return (
    <nav className="flex justify-center mb-4">
      <div className="nav-item">
        {step1 ? (
          <Link to="/login" className="nav-link">
            Sign In
          </Link>
        ) : (
          <span className="nav-link-disabled">Sign In</span>
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
