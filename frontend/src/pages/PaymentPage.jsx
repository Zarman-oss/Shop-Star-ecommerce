import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault;
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-4xl font-semibold mb-6 text-center">
        Payment Method
      </h1>
      <form onSubmit={submitHandler}>
        <div className="my-4">
          <label className="block text-lg font-bold mb-2">Select Method</label>
          <div className="col">
            <input
              type="radio"
              className="my-2"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal" className="text-lg">
              PayPal or Credit Card
            </label>
          </div>
          {/* Button */}

          <div>
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-500 text-white mt-3 font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default PaymentPage;
