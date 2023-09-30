import PropTypes from 'prop-types';

const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">{children}</div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContainer;
