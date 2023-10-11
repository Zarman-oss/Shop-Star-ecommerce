import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 className="text-4xl font-semibold mb-6 text-center">
          PlaceOrderPage
        </h1>
      </div>
    </>
  );
};

export default PlaceOrderPage;
