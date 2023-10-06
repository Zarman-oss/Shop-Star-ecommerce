import { useState } from 'react';
import FormContainer from '../components/FormContainer';

const ShippingPage = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <FormContainer>
      <h1 className="text-4xl font-semibold mb-6 text-center">ShippingPage</h1>
      <form onSubmit={submitHandler}>
        {/* Address  */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            <h2 className="text-2xl">Address</h2>
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>
        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            <h2 className="text-2xl">City</h2>
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded-md py-2 px-3 mt-1 w-full placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-sm"
          />
        </div>
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
