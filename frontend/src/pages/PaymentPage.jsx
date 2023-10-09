import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-4xl font-semibold mb-6 text-center">
        Payment Method
      </h1>
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
            className="bg-gray-700 hover:bg-gray-500 text-white font-semibold py-3 px-4 rounded transition duration-300 ease-in-out text-xs"
          >
            Continue here
          </button>
        </div>
      </div>
    </FormContainer>
  );
};

export default PaymentPage;
