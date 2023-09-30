import PropTypes from 'prop-types';

const Message = ({ type, message }) => {
  const alertClasses = `alert ${
    type === 'success'
      ? 'alert-success'
      : type === 'warning'
      ? 'alert-warning'
      : 'alert-error'
  }`;

  return (
    <div className={alertClasses} role="alert">
      {message}
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
